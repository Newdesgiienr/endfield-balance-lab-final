(function () {
  'use strict';

  const STORAGE_KEY = 'endfield.partyAnalyses.v1';

  // 숨김 처리된 분석은 번들 데이터와 브라우저 임시 저장소 양쪽에서 제외합니다.
  const EXCLUDED_ANALYSIS_IDS = new Set([
    'party-gilberta-laevatain-wolfguard-akekuri'
  ]);

  const EXCLUDED_PARTY_SIGNATURES = new Set([
    'gilberta|laevatain|wolfguard|akekuri'
  ]);

  function safeParse(value, fallback) {
    try { return JSON.parse(value); } catch (_) { return fallback; }
  }

  function normalizeMemberKey(member) {
    return String(member?.id || member?.name || '')
      .trim()
      .toLocaleLowerCase('ko-KR');
  }

  function partySignature(item) {
    return (item?.party || [])
      .slice()
      .sort((left, right) => Number(left?.order || 0) - Number(right?.order || 0))
      .map(normalizeMemberKey)
      .filter(Boolean)
      .join('|');
  }

  function normalizeId(item) {
    if (item?.id) return String(item.id);
    const ids = (item?.party || []).map((member) => member.id || member.name).filter(Boolean);
    return ids.length ? `party-${ids.join('-')}` : `party-${Date.now()}`;
  }

  function isExcluded(item) {
    return EXCLUDED_ANALYSIS_IDS.has(normalizeId(item)) || EXCLUDED_PARTY_SIGNATURES.has(partySignature(item));
  }

  function saveLocal(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return true;
    } catch (_) {
      return false;
    }
  }

  function loadLocal() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      const parsed = value ? safeParse(value, []) : [];
      const items = Array.isArray(parsed) ? parsed : [];
      const filtered = items.filter((item) => item && typeof item === 'object' && !isExcluded(item));

      // 과거에 저장된 숨김 대상 분석도 브라우저 저장소에서 정리합니다.
      if (filtered.length !== items.length) saveLocal(filtered);
      return filtered;
    } catch (_) {
      return [];
    }
  }

  function bundled() {
    const items = Array.isArray(window.SAVED_PARTY_ANALYSES) ? window.SAVED_PARTY_ANALYSES : [];
    return items.filter((item) => item && typeof item === 'object' && !isExcluded(item));
  }

  function exportedAtValue(item) {
    const time = Date.parse(String(item?.exportedAt || ''));
    return Number.isFinite(time) ? time : 0;
  }

  function leaderKey(item) {
    const orderedParty = (item?.party || [])
      .slice()
      .sort((left, right) => Number(left?.order || 0) - Number(right?.order || 0));
    return normalizeMemberKey(orderedParty[0]) || normalizeId(item);
  }

  function groupByFirstMember(items) {
    // 최신 분석 순서를 기준으로 그룹의 위치를 정하고,
    // 같은 첫 번째 캐릭터를 가진 파티들은 서로 붙여서 표시합니다.
    const newestFirst = items.slice().sort((left, right) => {
      const dateDifference = exportedAtValue(right) - exportedAtValue(left);
      if (dateDifference) return dateDifference;
      return normalizeId(left).localeCompare(normalizeId(right), 'ko-KR');
    });

    const groupOrder = new Map();
    newestFirst.forEach((item) => {
      const key = leaderKey(item);
      if (!groupOrder.has(key)) groupOrder.set(key, groupOrder.size);
    });

    return newestFirst.sort((left, right) => {
      const leftGroup = groupOrder.get(leaderKey(left)) ?? Number.MAX_SAFE_INTEGER;
      const rightGroup = groupOrder.get(leaderKey(right)) ?? Number.MAX_SAFE_INTEGER;
      if (leftGroup !== rightGroup) return leftGroup - rightGroup;

      const dateDifference = exportedAtValue(right) - exportedAtValue(left);
      if (dateDifference) return dateDifference;
      return normalizeId(left).localeCompare(normalizeId(right), 'ko-KR');
    });
  }

  function getAll() {
    const map = new Map();
    [...bundled(), ...loadLocal()].forEach((item) => {
      if (!item || typeof item !== 'object' || isExcluded(item)) return;
      map.set(normalizeId(item), item);
    });
    return groupByFirstMember([...map.values()]);
  }

  function upsert(item) {
    if (!item || typeof item !== 'object' || isExcluded(item)) return false;
    const id = normalizeId(item);
    item.id = id;
    const items = loadLocal();
    const index = items.findIndex((entry) => normalizeId(entry) === id);
    if (index >= 0) items[index] = item;
    else items.unshift(item);
    return saveLocal(items.slice(0, 100));
  }

  function find(id) {
    return getAll().find((item) => normalizeId(item) === String(id || '')) || null;
  }

  window.AnalysisStore = { STORAGE_KEY, getAll, upsert, find, loadLocal };
})();
