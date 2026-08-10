(function () {
  'use strict';

  const DATA = window.APP_DATA || { characters: [], glossary: {} };
  const glossary = DATA.glossary || {};
  const SKPORT_ASSETS = window.SKPORT_ASSETS || {};
  const ANALYSIS_STORE = window.AnalysisStore || { upsert: () => false };
  const GAME_TERMS = window.GAME_TERMS || { terms: [], keywords: [] };
  const GAME_TERM_BY_ID = new Map((GAME_TERMS.terms || []).map((term) => [term.id, term]));
  const GAME_KEYWORD_BY_TEXT = new Map((GAME_TERMS.keywords || []).map((keyword) => [keyword.text, keyword]));
  const GAME_KEYWORDS = [...GAME_KEYWORD_BY_TEXT.values()].sort((left, right) => right.text.length - left.text.length);
  const GAME_KEYWORD_PATTERN = GAME_KEYWORDS.length
    ? new RegExp(GAME_KEYWORDS.map((keyword) => keyword.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
    : null;

  function esc(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function normalizeCharacters(characters) {
    const managerPattern = /^관리자(?:\s*\[(?:남|여)\]|\((?:남|여)\))$/;
    const managerEntries = characters.filter((character) => managerPattern.test(character.name));
    if (!managerEntries.length) return characters;

    const female = managerEntries.find((character) => /여/.test(character.name));
    const merged = {
      ...(female || managerEntries[0]),
      id: 'administrator',
      name: '관리자 [남][여]',
      assetName: '관리자(여)'
    };

    const firstManagerIndex = characters.findIndex((character) => managerPattern.test(character.name));
    const withoutManagers = characters.filter((character) => !managerPattern.test(character.name));
    withoutManagers.splice(firstManagerIndex, 0, merged);
    return withoutManagers;
  }

  const FILTER_GROUPS = [
    {
      key: 'element',
      label: '속성',
      items: [
        { id: 'physical', label: '물리', assetName: '관리자(여)', iconIndex: 0 },
        { id: 'heat', label: '열기', assetName: '레바테인', iconIndex: 0 },
        { id: 'electric', label: '전기', assetName: '리노', iconIndex: 0 },
        { id: 'frost', label: '냉기', assetName: '이본', iconIndex: 0 },
        { id: 'nature', label: '자연', assetName: '질베르타', iconIndex: 0 }
      ]
    },
    {
      key: 'role',
      label: '역할군',
      items: [
        { id: 'guard', label: '가드', assetName: '에스텔라', iconIndex: 1 },
        { id: 'defender', label: '디펜더', assetName: '엠버', iconIndex: 1 },
        { id: 'supporter', label: '서포터', assetName: '자이히', iconIndex: 1 },
        { id: 'caster', label: '캐스터', assetName: '울프가드', iconIndex: 1 },
        { id: 'striker', label: '스트라이커', assetName: '레바테인', iconIndex: 1 },
        { id: 'vanguard', label: '뱅가드', assetName: '카뮤', iconIndex: 1 }
      ]
    }
  ];

  function characterAsset(character) {
    const lookupName = character.name === '관리자 [남][여]' ? '관리자(여)' : (character.assetName || character.name);
    return SKPORT_ASSETS[lookupName] || null;
  }

  function filterIcon(item) {
    return SKPORT_ASSETS[item.assetName]?.icons?.[item.iconIndex] || '';
  }

  function characterClassification(character) {
    const icons = characterAsset(character)?.icons || [];
    const result = { element: '', role: '' };
    FILTER_GROUPS.forEach((group) => {
      const matched = group.items.find((item) => filterIcon(item) === icons[item.iconIndex]);
      result[group.key] = matched?.id || '';
    });
    return result;
  }

  const ELEMENT_SORT_ORDER = ['physical', 'heat', 'electric', 'frost', 'nature'];
  const CHARACTERS = normalizeCharacters(DATA.characters || [])
    .map((character, originalIndex) => ({ character, originalIndex }))
    .sort((left, right) => {
      const a = ELEMENT_SORT_ORDER.indexOf(characterClassification(left.character).element);
      const b = ELEMENT_SORT_ORDER.indexOf(characterClassification(right.character).element);
      return (a < 0 ? 99 : a) - (b < 0 ? 99 : b) || left.originalIndex - right.originalIndex;
    })
    .map((entry) => entry.character);
  const CHARACTER_BY_ID = new Map(CHARACTERS.map((character) => [character.id, character]));

  const MECHANICS = [
    { id: 'physicalDamage', label: '물리 피해', color: 'brown', kind: 'damage', patterns: ['물리 피해'] },
    { id: 'heatDamage', label: '열기 피해', color: 'heat', kind: 'damage', patterns: ['열기 피해'] },
    { id: 'electricDamage', label: '전기 피해', color: 'electric', kind: 'damage', patterns: ['전기 피해'] },
    { id: 'frostDamage', label: '냉기 피해', color: 'frost', kind: 'damage', patterns: ['냉기 피해'] },
    { id: 'natureDamage', label: '자연 피해', color: 'nature', kind: 'damage', patterns: ['자연 피해'] },
    { id: 'artsDamage', label: '아츠 피해', color: 'cyan', kind: 'damage', patterns: ['아츠 피해'] },
    { id: 'heatInfliction', label: '열기 부착', color: 'heat', kind: 'setup', patterns: ['열기 부착'] },
    { id: 'electricInfliction', label: '전기 부착', color: 'electric', kind: 'setup', patterns: ['전기 부착'] },
    { id: 'frostInfliction', label: '냉기 부착', color: 'frost', kind: 'setup', patterns: ['냉기 부착'] },
    { id: 'natureInfliction', label: '자연 부착', color: 'nature', kind: 'setup', patterns: ['자연 부착'] },
    { id: 'artsInfliction', label: '아츠 부착', color: 'cyan', kind: 'setup', patterns: ['아츠 부착'] },
    { id: 'artsAbnormality', label: '아츠 이상', color: 'cyan', kind: 'state', patterns: ['아츠 이상'] },
    { id: 'combustion', label: '연소', color: 'heat', kind: 'state', patterns: ['연소'] },
    { id: 'shock', label: '감전', color: 'electric', kind: 'state', patterns: ['감전'] },
    { id: 'freeze', label: '동결', color: 'frost', kind: 'state', patterns: ['동결'] },
    { id: 'corrosion', label: '부식', color: 'nature', kind: 'state', patterns: ['부식'] },
    { id: 'defenseless', label: '방어 불능', color: 'brown', kind: 'setup', patterns: ['방어 불능', '방어불능'] },
    { id: 'launch', label: '띄우기', color: 'brown', kind: 'physical', patterns: ['띄우기'] },
    { id: 'knockdown', label: '넘어뜨리기', color: 'brown', kind: 'physical', patterns: ['넘어뜨리기'] },
    { id: 'smash', label: '강타', color: 'brown', kind: 'consume', patterns: ['강타'] },
    { id: 'armorBreak', label: '갑옷 파괴', color: 'brown', kind: 'consume', patterns: ['갑옷 파괴'] },
    { id: 'imbalance', label: '불균형', color: 'brown', kind: 'control', patterns: ['불균형'] },
    { id: 'powerStrike', label: '강력한 일격', color: 'orange', kind: 'action', patterns: ['강력한 일격'] },
    { id: 'execution', label: '처형', color: 'red', kind: 'action', patterns: ['처형'] },
    { id: 'artsVulnerability', label: '아츠 취약', color: 'cyan', kind: 'amplify', patterns: ['아츠 취약'] },
    { id: 'physicalVulnerability', label: '물리 취약', color: 'brown', kind: 'amplify', patterns: ['물리 취약'] },
    { id: 'heatVulnerability', label: '열기 취약', color: 'heat', kind: 'amplify', patterns: ['열기 취약'] },
    { id: 'electricVulnerability', label: '전기 취약', color: 'electric', kind: 'amplify', patterns: ['전기 취약'] },
    { id: 'frostVulnerability', label: '냉기 취약', color: 'frost', kind: 'amplify', patterns: ['냉기 취약'] },
    { id: 'natureVulnerability', label: '자연 취약', color: 'nature', kind: 'amplify', patterns: ['자연 취약'] },
    { id: 'artsAmplification', label: '아츠 증폭', color: 'cyan', kind: 'amplify', patterns: ['아츠 증폭'] },
    { id: 'physicalAmplification', label: '물리 증폭', color: 'brown', kind: 'amplify', patterns: ['물리 증폭'] },
    { id: 'heatAmplification', label: '열기 증폭', color: 'heat', kind: 'amplify', patterns: ['열기 증폭'] },
    { id: 'electricAmplification', label: '전기 증폭', color: 'electric', kind: 'amplify', patterns: ['전기 증폭'] },
    { id: 'frostAmplification', label: '냉기 증폭', color: 'frost', kind: 'amplify', patterns: ['냉기 증폭'] },
    { id: 'natureAmplification', label: '자연 증폭', color: 'nature', kind: 'amplify', patterns: ['자연 증폭'] },
    { id: 'skillGauge', label: '스킬 게이지', color: 'cyan', kind: 'resource', patterns: ['스킬 게이지'] },
    { id: 'skillGaugeReturn', label: '스킬 게이지 반환', color: 'cyan', kind: 'resource', patterns: ['스킬 게이지 반환', '게이지를 반환', '게이지 반환'] },
    { id: 'ultimateEnergy', label: '궁극기 에너지', color: 'orange', kind: 'resource', patterns: ['궁극기 에너지'] },
    { id: 'protection', label: '보호', color: 'blue', kind: 'survival', patterns: ['보호'] },
    { id: 'fortification', label: '비호', color: 'blue', kind: 'survival', patterns: ['비호'] },
    { id: 'healing', label: '치유', color: 'green', kind: 'survival', patterns: ['치유', '생명력 회복'] },
    { id: 'weakness', label: '허약', color: 'purple', kind: 'debuff', patterns: ['허약'] },
    { id: 'comboHit', label: '연타', color: 'orange', kind: 'buff', patterns: ['연타'] },
    { id: 'cleanse', label: '정화', color: 'green', kind: 'survival', patterns: ['정화'] },
    { id: 'slow', label: '감속', color: 'blue', kind: 'control', patterns: ['감속'] },
    { id: 'haste', label: '가속', color: 'green', kind: 'buff', patterns: ['가속'] },
    { id: 'originiumCrystal', label: '오리지늄 결정', color: 'purple', kind: 'setup', patterns: ['오리지늄 결정'] },
    { id: 'mainControl', label: '메인 컨트롤', color: 'navy', kind: 'action', patterns: ['메인 컨트롤'] },
    { id: 'generalAttack', label: '일반 공격', color: 'navy', kind: 'action', patterns: ['일반 공격'] },
    { id: 'battleSkill', label: '배틀 스킬', color: 'blue', kind: 'action', patterns: ['배틀 스킬'] },
    { id: 'linkSkill', label: '연계 스킬', color: 'purple', kind: 'action', patterns: ['연계 스킬'] },
    { id: 'ultimate', label: '궁극기', color: 'orange', kind: 'action', patterns: ['궁극기'] }
  ];
  const MECHANIC_BY_ID = new Map(MECHANICS.map((mechanic) => [mechanic.id, mechanic]));

  function cleanText(text) {
    return String(text ?? '')
      .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, '$2')
      .replace(/\[([^\]]+)\]/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function detectMechanics(text) {
    const source = cleanText(text);
    return new Set(MECHANICS.filter((mechanic) => mechanic.patterns.some((pattern) => source.includes(pattern))).map((mechanic) => mechanic.id));
  }

  function sentences(text) {
    return cleanText(text).split(/(?<=[.!?]|습니다\.|한다\.|된다\.)\s+/).filter(Boolean);
  }

  function classifyRelations(text) {
    const output = new Set();
    const requirement = new Set();
    const consume = new Set();
    const outputWords = /부여|쌓|누적|생성|획득|회복|반환|증가|강제|전개|확보|만들|걸고|적용|활성화|소환|준비/;
    const requirementWords = /상태일 때|상태의 적|상태라면|이 있을 때|도달한|중첩된|조건|명중했을 때|받았을 때|소모된 후|흡수된 후|발동할 수/;
    const consumeWords = /소모|흡수|파괴|해제|사라|종료/;

    sentences(text).forEach((sentence, index) => {
      const mechanics = detectMechanics(sentence);
      mechanics.forEach((id) => {
        if (outputWords.test(sentence)) output.add(id);
        if (requirementWords.test(sentence) || (index === 0 && /사용할 수/.test(sentence))) requirement.add(id);
        if (consumeWords.test(sentence)) consume.add(id);
      });
    });

    if (output.has('launch') || output.has('knockdown')) output.add('defenseless');
    if ([...output].some((id) => /Infliction$/.test(id) && id !== 'artsInfliction')) output.add('artsInfliction');
    return { output, requirement, consume };
  }

  function skillTypeId(type) {
    const source = String(type || '');
    if (source.includes('일반')) return 'generalAttack';
    if (source.includes('배틀')) return 'battleSkill';
    if (source.includes('연계')) return 'linkSkill';
    if (source.includes('궁극')) return 'ultimate';
    return '';
  }

  function skillProfile(character, skill, index) {
    const paragraphs = (skill.paragraphs || []).map(cleanText).filter(Boolean);
    const text = paragraphs.join(' ');
    const relations = classifyRelations(text);
    const typeId = skillTypeId(skill.type || skill.index);
    if (typeId) relations.output.add(typeId);
    return {
      character,
      index,
      name: skill.name,
      type: skill.type || skill.index || '',
      typeId,
      paragraphs,
      text: cleanText(text),
      mechanics: detectMechanics(text),
      ...relations,
      badges: skill.badges || (skill.badge ? [{ text: skill.badge }] : [])
    };
  }

  function skillAliases(skill) {
    const aliases = new Set([cleanText(skill.name)]);
    const parts = cleanText(skill.name).split('·').map((part) => part.trim()).filter(Boolean);
    if (parts.length > 1) aliases.add(parts.at(-1));
    return [...aliases].filter((alias) => alias.length >= 2).sort((a, b) => b.length - a.length);
  }

  function inferSkillForStep(step, skills) {
    const source = cleanText(`${step.label} ${step.detail}`);
    const direct = skills.find((skill) => skillAliases(skill).some((alias) => source.includes(alias)));
    if (direct) return direct;

    const typeRules = [
      ['linkSkill', /연계(?: 스킬)?|연계 조건|발동 조건/],
      ['battleSkill', /배틀(?: 스킬)?/],
      ['ultimate', /궁극기(?! 에너지)|중력장|강화 상태 진입/],
      ['generalAttack', /일반 공격|강력한 일격|처형|낙하 공격/]
    ];
    for (const [typeId, pattern] of typeRules) {
      if (!pattern.test(source)) continue;
      const sameType = skills.filter((skill) => skill.typeId === typeId);
      if (sameType.length === 1) return sameType[0];
    }

    const mechanics = detectMechanics(source);
    let best = null;
    let bestScore = 0;
    skills.forEach((skill) => {
      let score = 0;
      mechanics.forEach((id) => {
        if (skill.mechanics.has(id)) score += 1;
        if (skill.output.has(id)) score += 2;
        if (skill.requirement.has(id)) score += 2;
        if (skill.consume.has(id)) score += 2;
      });
      if (/소모|흡수|전환/.test(source) && skill.consume.size) score += 2;
      if (/부여|생성|누적|축적/.test(source) && skill.output.size) score += 1;
      if (/궁극기/.test(source) && skill.typeId === 'ultimate') score += 4;
      if (/연계/.test(source) && skill.typeId === 'linkSkill') score += 4;
      if (score > bestScore) {
        best = skill;
        bestScore = score;
      }
    });
    return bestScore >= 3 ? best : null;
  }

  function stepStages(label, detail) {
    const source = `${label} ${detail}`;
    const stages = new Set();
    if (/준비|생성|부여|누적|축적|수급|주입|설치|대기|확보|전개|부착|날개|방패/.test(source)) stages.add('setup');
    if (/조건|연계|발동|피격|차지|명중|확인|추격/.test(source)) stages.add('trigger');
    if (/소모|흡수|전환|동결|연소|감전|부식|강타|갑옷 파괴|파괴|폭발/.test(source)) stages.add('convert');
    if (/궁극기|마무리|집중|강화|추가 피해|취약|증폭|지속 피해|화력|공격/.test(source)) stages.add('payoff');
    if (/회복|반환|재투자|재연결|순환|초기화|재가속|재준비|쿨타임|유지/.test(source)) stages.add('recycle');
    if (!stages.size) stages.add('trigger');
    return stages;
  }

  function stepProfile(character, step, index, skills) {
    const detail = cleanText(step.detail);
    const matchedSkill = inferSkillForStep(step, skills);
    const relations = classifyRelations(detail);
    return {
      character,
      index,
      label: step.label,
      detail,
      mechanics: detectMechanics(`${step.label} ${detail}`),
      stages: stepStages(step.label, detail),
      skill: matchedSkill || null,
      ...relations
    };
  }

  function characterProfile(character) {
    const skills = (character.skills || []).map((skill, index) => skillProfile(character, skill, index));
    const steps = (character.loop || []).map((step, index) => stepProfile(character, step, index, skills));
    const loopText = cleanText((character.loop || []).map((step) => `${step.label} ${step.detail}`).join(' '));
    const typeWeights = { generalAttack: 0, battleSkill: 0, linkSkill: 0, ultimate: 0 };
    Object.keys(typeWeights).forEach((typeId) => {
      typeWeights[typeId] += (loopText.match(new RegExp(MECHANIC_BY_ID.get(typeId).label, 'g')) || []).length * 2;
    });
    skills.forEach((skill) => {
      const count = (loopText.match(new RegExp(skill.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      if (skill.typeId) typeWeights[skill.typeId] += count * 3 + 1;
    });
    return {
      character,
      skills,
      steps,
      mechanics: detectMechanics([character.tags?.join(' '), loopText, skills.map((skill) => skill.text).join(' ')].join(' ')),
      typeWeights,
      classification: characterClassification(character)
    };
  }

  const PROFILE_BY_ID = new Map(CHARACTERS.map((character) => [character.id, characterProfile(character)]));

  function outputMatchesRequirement(output, requirement) {
    if (output === requirement) return true;
    if (requirement === 'artsInfliction' && /Infliction$/.test(output)) return true;
    if (requirement === 'artsAbnormality' && ['combustion', 'shock', 'freeze', 'corrosion'].includes(output)) return true;
    if (requirement === 'defenseless' && ['launch', 'knockdown', 'defenseless'].includes(output)) return true;
    if (requirement === 'imbalance' && ['powerStrike', 'launch', 'knockdown', 'smash', 'armorBreak', 'imbalance'].includes(output)) return true;
    return false;
  }

  function matchingMechanic(source, target) {
    for (const output of source.output) {
      for (const requirement of target.requirement) {
        if (outputMatchesRequirement(output, requirement)) return requirement === 'artsInfliction' ? output : requirement;
      }
    }
    for (const id of source.mechanics) {
      if (target.mechanics.has(id) && !['generalAttack', 'battleSkill', 'linkSkill', 'ultimate', 'mainControl'].includes(id)) return id;
    }
    return '';
  }

  function nodeLinkScore(source, target) {
    let score = 0;
    const matched = matchingMechanic(source, target);
    if (matched) score += 7;
    if (source.character.id !== target.character.id) score += 1.5;
    if (source.output.has('skillGauge') && (target.mechanics.has('battleSkill') || target.skill?.typeId === 'battleSkill')) score += 2;
    if (source.output.has('ultimateEnergy') && (target.mechanics.has('ultimate') || target.skill?.typeId === 'ultimate')) score += 2;
    if (source.character.id === target.character.id && target.index === source.index + 1) score += 1.5;
    return score;
  }

  function partyMechanicScores(profiles) {
    const scores = new Map();
    MECHANICS.forEach((mechanic) => scores.set(mechanic.id, 0));
    profiles.forEach((profile) => {
      const seen = new Set();
      profile.steps.forEach((step) => {
        step.mechanics.forEach((id) => {
          scores.set(id, (scores.get(id) || 0) + 1);
          seen.add(id);
        });
        step.output.forEach((id) => scores.set(id, (scores.get(id) || 0) + 1.5));
        step.requirement.forEach((id) => scores.set(id, (scores.get(id) || 0) + 1.5));
        step.consume.forEach((id) => scores.set(id, (scores.get(id) || 0) + 2));
      });
      seen.forEach((id) => scores.set(id, (scores.get(id) || 0) + 2));
    });

    const setupIds = ['heatInfliction', 'electricInfliction', 'frostInfliction', 'natureInfliction'];
    const setupPresent = setupIds.filter((id) => (scores.get(id) || 0) > 2);
    if (setupPresent.length >= 2) {
      setupPresent.forEach((id) => scores.set(id, (scores.get(id) || 0) + 2));
      scores.set('artsInfliction', (scores.get('artsInfliction') || 0) + setupPresent.length * 2);
    }

    return scores;
  }

  function topMechanics(scores, limit = 6) {
    const excluded = new Set(['generalAttack', 'battleSkill', 'linkSkill', 'ultimate', 'mainControl', 'physicalDamage', 'heatDamage', 'electricDamage', 'frostDamage', 'natureDamage', 'artsDamage']);
    return [...scores.entries()]
      .filter(([id, score]) => score > 1.5 && !excluded.has(id))
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id, score]) => ({ ...MECHANIC_BY_ID.get(id), score }));
  }

  function chooseCoreNodes(profiles, mechanicScores) {
    const candidates = profiles.flatMap((profile) => profile.steps);
    const topIds = new Set(topMechanics(mechanicScores, 8).map((mechanic) => mechanic.id));
    const setupIds = new Set(['heatInfliction', 'electricInfliction', 'frostInfliction', 'natureInfliction', 'artsInfliction', 'defenseless', 'originiumCrystal']);
    const stateIds = new Set(['combustion', 'shock', 'freeze', 'corrosion', 'smash', 'armorBreak']);
    const amplifyIds = new Set(['artsVulnerability', 'physicalVulnerability', 'heatVulnerability', 'electricVulnerability', 'frostVulnerability', 'natureVulnerability', 'artsAmplification', 'physicalAmplification', 'heatAmplification', 'electricAmplification', 'frostAmplification', 'natureAmplification']);
    const resourceIds = new Set(['skillGauge', 'skillGaugeReturn', 'ultimateEnergy']);
    const stageOrder = ['setup', 'trigger', 'convert', 'payoff', 'recycle'];
    const chosen = [];
    const usage = new Map();

    function countIn(set, ids) {
      let count = 0;
      ids.forEach((id) => { if (set.has(id)) count += 1; });
      return count;
    }

    function stageSpecificScore(node, stage) {
      const label = `${node.label} ${node.detail}`;
      let score = node.stages.has(stage) ? 6 : -3;
      if (stage === 'setup') {
        score += countIn(node.output, setupIds) * 5;
        score += /준비|생성|부여|누적|축적|주입|설치|부착/.test(node.label) ? 4 : 0;
        score -= node.requirement.size * 1.6;
        score -= /궁극기|마무리/.test(node.label) ? 4 : 0;
      }
      if (stage === 'trigger') {
        score += node.requirement.size * 3.5;
        score += /조건|연계|발동|강력한 일격|피격|차지|명중/.test(label) ? 3 : 0;
        score += node.skill?.typeId === 'linkSkill' ? 2 : 0;
      }
      if (stage === 'convert') {
        score += node.consume.size * 5;
        score += countIn(node.output, stateIds) * 4;
        score += /소모|흡수|전환|동결|연소|감전|부식|강타|갑옷 파괴|파괴/.test(label) ? 4 : 0;
      }
      if (stage === 'payoff') {
        score += countIn(node.mechanics, amplifyIds) * 3;
        score += node.skill?.typeId === 'ultimate' ? 5 : 0;
        score += node.mechanics.has('generalAttack') && /강화/.test(label) ? 4 : 0;
        score += /궁극기|마무리|집중|강화|추가 피해|취약|증폭|화력/.test(label) ? 4 : 0;
      }
      if (stage === 'recycle') {
        score += countIn(node.mechanics, resourceIds) * 4;
        score += countIn(node.output, resourceIds) * 4;
        score += /회복|반환|재투자|재연결|순환|초기화|재가속|재준비|유지/.test(label) ? 4 : 0;
        score -= /궁극기 마무리|집중 공격/.test(label) ? 2 : 0;
      }
      return score;
    }

    stageOrder.forEach((stage) => {
      let best = null;
      let bestScore = -Infinity;
      candidates.forEach((node) => {
        if (chosen.includes(node)) return;
        let score = stageSpecificScore(node, stage);
        node.mechanics.forEach((id) => {
          if (topIds.has(id)) score += 1.4;
          score += Math.min((mechanicScores.get(id) || 0) / 10, 1.3);
        });
        if (node.skill) score += 1;
        if (chosen.length) score += nodeLinkScore(chosen[chosen.length - 1], node) * 1.25;
        const used = usage.get(node.character.id) || 0;
        if (used === 0) score += 2.5;
        if (used >= 2) score -= 5;
        if (score > bestScore) {
          best = node;
          bestScore = score;
        }
      });
      if (best && bestScore >= 2) {
        chosen.push(best);
        usage.set(best.character.id, (usage.get(best.character.id) || 0) + 1);
      }
    });

    if (chosen.length < 4) {
      candidates
        .filter((node) => !chosen.includes(node))
        .sort((left, right) => {
          const leftScore = [...left.mechanics].reduce((sum, id) => sum + (mechanicScores.get(id) || 0), 0) + (usage.get(left.character.id) ? 0 : 8);
          const rightScore = [...right.mechanics].reduce((sum, id) => sum + (mechanicScores.get(id) || 0), 0) + (usage.get(right.character.id) ? 0 : 8);
          return rightScore - leftScore;
        })
        .slice(0, 4 - chosen.length)
        .forEach((node) => chosen.push(node));
    }

    return chosen.slice(0, 6);
  }

  function mechanicChip(id, text) {
    const mechanic = MECHANIC_BY_ID.get(id);
    if (!mechanic) return `<span class="analysis-chip">${esc(text || id)}</span>`;
    return `<span class="analysis-chip" data-color="${esc(mechanic.color)}">${esc(text || mechanic.label)}</span>`;
  }

  function gameKeywordButton(keyword, label) {
    return `<button type="button" class="term-link" data-game-keyword="${esc(keyword.text)}" data-game-term="${esc(keyword.termId)}" data-color="${esc(keyword.color || 'cyan')}">${esc(label)}</button>`;
  }

  function explicitTermButton(key, label) {
    const legacy = glossary[key];
    const keyword = GAME_KEYWORD_BY_TEXT.get(label) || (legacy && GAME_KEYWORD_BY_TEXT.get(legacy.name));
    if (!legacy && !keyword) return esc(label);
    const attributes = [
      legacy ? `data-term="${esc(key)}"` : '',
      keyword ? `data-game-keyword="${esc(keyword.text)}" data-game-term="${esc(keyword.termId)}"` : '',
      `data-color="${esc(keyword?.color || legacy?.color || 'orange')}"`
    ].filter(Boolean).join(' ');
    return `<button type="button" class="term-link" ${attributes}>${esc(label)}</button>`;
  }

  function autoHighlight(text) {
    if (!GAME_KEYWORD_PATTERN || !text) return esc(text);
    const normalized = String(text).replace(/\[([^\[\]]+)\]/g, (match, inner) => {
      const clean = inner.trim();
      return GAME_KEYWORD_BY_TEXT.has(clean) ? clean : match;
    });
    let output = '';
    let cursor = 0;
    GAME_KEYWORD_PATTERN.lastIndex = 0;
    for (const match of normalized.matchAll(GAME_KEYWORD_PATTERN)) {
      const keyword = GAME_KEYWORD_BY_TEXT.get(match[0]);
      if (!keyword) continue;
      output += esc(normalized.slice(cursor, match.index));
      output += gameKeywordButton(keyword, match[0]);
      cursor = match.index + match[0].length;
    }
    output += esc(normalized.slice(cursor));
    return output;
  }

  function rich(text) {
    const source = String(text ?? '');
    const explicitTokens = [];
    const tokenized = source.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (_, key, label) => {
      const token = `\uE000${explicitTokens.length}\uE001`;
      explicitTokens.push(explicitTermButton(key, label));
      return token;
    });
    return tokenized.split(/(\uE000\d+\uE001)/g).map((part) => {
      const match = part.match(/^\uE000(\d+)\uE001$/);
      return match ? explicitTokens[Number(match[1])] : autoHighlight(part);
    }).join('');
  }

  function portrait(character, className = '') {
    const asset = characterAsset(character);
    if (!asset?.portrait) return `<span class="party-portrait party-portrait--fallback ${esc(className)}"><span>${esc(character.name.slice(0, 1))}</span></span>`;
    return `<span class="party-portrait ${esc(className)}"><img src="${esc(asset.portrait)}" alt="${esc(character.name)} 초상화" loading="lazy" referrerpolicy="no-referrer"></span>`;
  }

  function identityIcons(character) {
    const icons = (characterAsset(character)?.icons || []).slice(0, 2);
    return `<span class="party-identity-icons" aria-hidden="true">${icons.map((src) => `<img src="${esc(src)}" alt="">`).join('')}</span>`;
  }

  function filterControls() {
    return FILTER_GROUPS.map((group) => `<div class="filter-group" aria-label="${esc(group.label)} 필터">
      <span class="filter-group-label">${esc(group.label)}</span>
      <div class="filter-buttons">
        ${group.items.map((item) => {
          const src = filterIcon(item);
          return `<button type="button" class="filter-icon-button party-filter-button" data-filter-group="${esc(group.key)}" data-filter-value="${esc(item.id)}" data-tooltip="${esc(`${group.label} · ${item.label}`)}" aria-label="${esc(`${group.label} ${item.label} 필터`)}" aria-pressed="false">
            ${src ? `<img src="${esc(src)}" alt="">` : `<span>${esc(item.label.slice(0, 1))}</span>`}
          </button>`;
        }).join('')}
      </div>
    </div>`).join('<span class="filter-divider" aria-hidden="true"></span>');
  }

  function siteHeader() {
    return `<header class="app-topbar">
      <div class="brand">
        <a class="brand-mark" href="index.html" aria-label="Endfield Balance Lab 파티 분석 페이지"><img class="site-brand-character" src="assets/lab-brand-character.jpg" alt=""></a>
        <div class="brand-copy">
          <a class="brand-title" href="index.html"><strong>ENDFIELD BALANCE LAB</strong></a>
          <div class="brand-lower">
            <small>엔드필드 위기 협약 데이터베이스</small>
            <nav class="site-nav" aria-label="페이지 전환">
              <a href="glossary.html">용어 사전</a>
              <a href="characters.html">캐릭터</a>
              <a href="index.html" class="active" aria-current="page">파티 분석</a>
              <a href="results.html?partyDpr=${encodeURIComponent(window.devicePixelRatio || 1)}">분석 결과</a>
              <a href="dungeon-monsters.html">스테이지 구성</a>
              <a href="constraints.html">제약 추천</a>
              <a href="constraint-board.html">제약 설계</a>
              <a href="constraint-balancing/index.html">제약 밸런싱</a>
              <a href="control-time/index.html">컨트롤 시간</a>
              <a href="constraint-application/index.html">제약 적용</a>
              <a href="reward/index.html">보상 설계</a>
            </nav>
          </div>
        </div>
      </div>
    </header>`;
  }

  function normalizeSearchText(value) {
    return cleanText(value).normalize('NFKC').toLocaleLowerCase('ko-KR').replace(/\s+/g, ' ').trim();
  }

  const CHARACTER_SEARCH_INDEX = CHARACTERS.map((character) => normalizeSearchText([
    character.name,
    character.tags?.join(' '),
    character.subtitle,
    character.skills?.map((skill) => `${skill.name} ${(skill.paragraphs || []).join(' ')}`).join(' '),
    character.loop?.map((step) => `${step.label} ${step.detail}`).join(' ')
  ].join(' ')));

  function characterPickerCard(character, index) {
    const classification = characterClassification(character);
    return `<button type="button" class="party-character-card" data-character-id="${esc(character.id)}" data-character-index="${index}" data-element="${esc(classification.element)}" data-role="${esc(classification.role)}" aria-pressed="false">
      ${portrait(character, 'party-picker-portrait')}
      <span class="party-picker-check" aria-hidden="true">✓</span>
      <span class="party-picker-name">${esc(character.name)}</span>
      ${identityIcons(character)}
    </button>`;
  }

  function referenceBadgeHtml(item) {
    const badges = item.badges || (item.badge ? [{ text: item.badge }] : []);
    if (!badges.length) return '';
    return `<div class="party-reference-badges">${badges.map((badge) => {
      const text = typeof badge === 'string' ? badge : badge.text;
      return `<span>${esc(text)}</span>`;
    }).join('')}</div>`;
  }

  function referenceEntryHtml(item, index, kind) {
    const type = kind === 'skill'
      ? (item.type || `전투 스킬 ${index + 1}`)
      : kind === 'potential'
        ? (item.index || `P${index + 1}`)
        : (item.index || `재능 ${index + 1}`);
    const paragraphs = kind === 'potential'
      ? [item.text].filter(Boolean)
      : (item.paragraphs || []);
    const chips = kind === 'potential'
      ? (item.target ? [`영향 대상 · ${item.target}`] : [])
      : (item.chips || []);
    return `<article class="party-reference-entry party-reference-entry--${esc(kind)}">
      <header><span>${esc(type)}</span><strong>${esc(item.name)}</strong></header>
      ${referenceBadgeHtml(item)}
      <div class="party-reference-entry-copy">${paragraphs.map((paragraph) => `<p>${rich(paragraph)}</p>`).join('')}</div>
      ${chips.length ? `<div class="party-reference-chips">${chips.map((chip) => `<span>${esc(chip)}</span>`).join('')}</div>` : ''}
    </article>`;
  }

  function referenceCharacterHtml(character) {
    return `<div class="party-reference-profile">
      <header class="party-reference-character">
        ${portrait(character, 'party-reference-portrait')}
        <div><small>CHARACTER REFERENCE</small><h3>${esc(character.name)}</h3><p>${esc(character.subtitle || character.tags?.join(' · ') || '')}</p></div>
      </header>
      <section class="party-reference-section" aria-labelledby="party-reference-skills-title">
        <header><div><small>COMBAT SKILLS</small><h4 id="party-reference-skills-title">전투 스킬</h4></div><span>${character.skills?.length || 0}종</span></header>
        <div class="party-reference-list">${(character.skills || []).map((skill, index) => referenceEntryHtml(skill, index, 'skill')).join('')}</div>
      </section>
      <section class="party-reference-section" aria-labelledby="party-reference-talents-title">
        <header><div><small>TALENTS</small><h4 id="party-reference-talents-title">재능</h4></div><span>${character.talents?.length || 0}종</span></header>
        <div class="party-reference-list">${(character.talents || []).map((talent, index) => referenceEntryHtml(talent, index, 'talent')).join('')}</div>
      </section>
      <section class="party-reference-section" aria-labelledby="party-reference-potentials-title">
        <header><div><small>POTENTIALS</small><h4 id="party-reference-potentials-title">잠재력</h4></div><span>${character.potentials?.length || 0}단계</span></header>
        <div class="party-reference-list">${(character.potentials || []).map((potential, index) => referenceEntryHtml(potential, index, 'potential')).join('')}</div>
      </section>
    </div>`;
  }

  function referenceSearchResultHtml(character) {
    return `<button type="button" class="party-reference-result" data-reference-character-id="${esc(character.id)}">
      ${portrait(character, 'party-reference-result-portrait')}
      <span><strong>${esc(character.name)}</strong><small>${esc(character.subtitle || character.tags?.slice(0, 2).join(' · ') || '')}</small></span>
    </button>`;
  }

  function initCharacterReferencePanel() {
    const stage = document.getElementById('party-stage');
    const panel = document.getElementById('party-reference-panel');
    const toggle = document.getElementById('toggle-character-reference');
    const input = document.getElementById('party-reference-search');
    const results = document.getElementById('party-reference-results');
    const content = document.getElementById('party-reference-content');
    if (!stage || !panel || !toggle || !input || !results || !content) return;

    let open = false;
    let matches = [];
    let composing = false;

    function setOpen(next, focusSearch = false) {
      open = next;
      stage.classList.toggle('reference-open', next);
      panel.classList.toggle('open', next);
      panel.setAttribute('aria-hidden', String(!next));
      panel.inert = !next;
      toggle.setAttribute('aria-expanded', String(next));
      toggle.setAttribute('aria-label', next ? '캐릭터 빠른 조회 패널 닫기' : '캐릭터 빠른 조회 패널 열기');
      toggle.querySelector('.party-reference-toggle-icon').textContent = next ? '›' : '‹';
      if (focusSearch && next) window.setTimeout(() => input.focus(), 240);
    }

    function showCharacter(character) {
      if (!character) return;
      content.innerHTML = referenceCharacterHtml(character);
      content.dataset.characterId = character.id;
      results.hidden = true;
      input.value = character.name;
      input.setAttribute('aria-activedescendant', '');
    }

    function updateResults() {
      const query = normalizeSearchText(input.value);
      if (!query) {
        matches = [];
        results.hidden = true;
        content.innerHTML = `<div class="party-reference-empty"><strong>캐릭터 이름을 검색해 주세요.</strong><p>선택한 캐릭터의 전투 스킬 4종, 재능 2종과 잠재력 P1~P5를 이 패널에서 바로 확인할 수 있습니다.</p></div>`;
        delete content.dataset.characterId;
        return;
      }

      matches = CHARACTERS.filter((character) => normalizeSearchText(character.name).startsWith(query)).slice(0, 8);
      if (!matches.length) {
        results.innerHTML = '<div class="party-reference-no-result">일치하는 캐릭터가 없습니다.</div>';
        results.hidden = false;
        content.innerHTML = `<div class="party-reference-empty"><strong>검색 결과가 없습니다.</strong><p>캐릭터 이름의 첫 글자부터 다시 입력해 주세요.</p></div>`;
        delete content.dataset.characterId;
        return;
      }

      const exact = matches.find((character) => normalizeSearchText(character.name) === query);
      if (exact) {
        showCharacter(exact);
        return;
      }

      results.innerHTML = matches.map(referenceSearchResultHtml).join('');
      results.hidden = false;
      content.innerHTML = `<div class="party-reference-empty"><strong>검색 결과에서 캐릭터를 선택해 주세요.</strong><p>이름을 모두 입력하거나 결과를 클릭하면 전투 스킬, 재능과 잠재력을 불러옵니다.</p></div>`;
      delete content.dataset.characterId;
    }

    toggle.addEventListener('click', () => setOpen(!open, !open));
    input.addEventListener('compositionstart', () => { composing = true; });
    input.addEventListener('compositionend', () => {
      composing = false;
      updateResults();
    });
    input.addEventListener('input', () => {
      if (!composing) updateResults();
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && matches.length) {
        event.preventDefault();
        showCharacter(matches[0]);
      } else if (event.key === 'Escape') {
        if (input.value) {
          input.value = '';
          updateResults();
        } else setOpen(false);
      }
    });
    results.addEventListener('click', (event) => {
      const button = event.target.closest('[data-reference-character-id]');
      if (!button) return;
      showCharacter(CHARACTER_BY_ID.get(button.dataset.referenceCharacterId));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && open && document.activeElement !== input) setOpen(false);
    });

    setOpen(false);
  }

  function render() {
    document.body.innerHTML = `
      ${siteHeader()}
      <div id="party-stage" class="party-stage">
      <main class="page-shell party-page">
        <header class="page-heading party-page-heading">
          <div>
            <span>PARTY MECHANISM ANALYZER</span>
            <h1>파티 분석</h1>
            <p>초상화 4명을 선택하면 스킬의 생성·조건·소모 관계, 주력 전투 순환, 구조적 약점과 제약 설계의 발견 지점을 한눈에 정리합니다.</p>
          </div>
        </header>

        <section class="party-builder" aria-labelledby="party-builder-title">
          <header class="party-builder-heading">
            <div><small>4 OPERATOR PARTY</small><h2 id="party-builder-title">파티 편성</h2></div>
            <span id="party-count" class="party-count">0 / 4</span>
          </header>
          <div id="party-slots" class="party-slots" aria-label="파티원 배치 슬롯">
            ${[0, 1, 2, 3].map((index) => `<button type="button" class="party-slot empty" data-slot-index="${index}" aria-label="${index + 1}번 파티 슬롯, 비어 있음">
              <span class="party-slot-number">${index + 1}</span>
              <span class="party-slot-empty-content">
                <span class="party-slot-empty-mark">+</span>
                <span class="party-slot-empty-text">파티원 선택</span>
              </span>
            </button>`).join('')}
          </div>
          <p id="party-guidance" class="party-guidance" role="status" aria-live="polite">아래 캐릭터 목록에서 초상화를 눌러 파티원을 선택하세요.</p>
          <div class="party-actions">
            <button type="button" id="analyze-party" class="party-analyze-button" disabled><span class="party-analyze-label">파티원을 4명 선택해주세요</span></button>
          </div>
        </section>

        <section id="party-analysis" class="party-analysis" hidden aria-live="polite"></section>

        <section class="party-picker-shell" aria-labelledby="party-picker-title">
          <button type="button" id="toggle-party-picker" class="party-picker-bar" aria-expanded="true" aria-controls="party-picker-panel">
            <span class="party-picker-copy"><small class="party-picker-eyebrow">CHARACTER LIST</small><strong id="party-picker-title">캐릭터 목록</strong><span class="party-picker-description">초상화를 클릭하면 편성되고, 선택된 초상화를 다시 누르면 편성에서 해제됩니다.</span></span>
            <span class="party-picker-status"><b id="party-visible-count">${CHARACTERS.length}</b>명 <i>목록 접기</i></span>
          </button>
          <div id="party-picker-panel" class="party-picker-panel">
            <div class="party-picker-tools">
              <label class="search-field party-search-field">
                <span>캐릭터 검색</span>
                <input id="party-character-search" type="search" placeholder="이름, 스킬, 효과 검색">
              </label>
              <div class="party-picker-filters" aria-label="속성 및 역할군 필터">
                ${filterControls()}
                <button type="button" id="party-reset-filters" class="reset-filters" hidden>필터 해제</button>
              </div>
            </div>
            <div id="party-character-grid" class="party-character-grid">
              ${CHARACTERS.map(characterPickerCard).join('')}
            </div>
            <div id="party-picker-empty" class="empty-state" hidden>검색 조건에 맞는 캐릭터가 없습니다.</div>
          </div>
        </section>
      </main>
      </div>
      <button type="button" id="toggle-character-reference" class="party-reference-toggle" aria-expanded="false" aria-controls="party-reference-panel" aria-label="캐릭터 빠른 조회 패널 열기">
        <span class="party-reference-toggle-icon" aria-hidden="true">‹</span>
      </button>
      <aside id="party-reference-panel" class="party-reference-panel" aria-hidden="true" aria-labelledby="party-reference-title" inert>
        <div class="party-reference-panel-inner">
          <header class="party-reference-panel-heading"><small>QUICK CHARACTER LOOKUP</small><h2 id="party-reference-title">캐릭터 빠른 조회</h2><p>분석 화면을 유지한 채 캐릭터의 전투 스킬, 재능과 잠재력을 확인하세요.</p></header>
          <label class="search-field party-reference-search-field">
            <span>캐릭터 이름 검색</span>
            <input id="party-reference-search" type="search" autocomplete="off" placeholder="예: 이본, 탕탕, 레바테인" aria-controls="party-reference-results">
          </label>
          <div id="party-reference-results" class="party-reference-results" role="listbox" hidden></div>
          <div id="party-reference-content" class="party-reference-content" aria-live="polite">
            <div class="party-reference-empty"><strong>캐릭터 이름을 검색해 주세요.</strong><p>선택한 캐릭터의 전투 스킬 4종, 재능 2종과 잠재력 P1~P5를 이 패널에서 바로 확인할 수 있습니다.</p></div>
          </div>
        </div>
      </aside>
      <div id="party-toast" class="party-toast" role="status" aria-live="assertive"></div>
      <div class="tooltip" role="tooltip" aria-hidden="true"></div>`;

    initPartyBuilder();
    initPickerFilters();
    initCharacterReferencePanel();
    initTooltip();
  }

  function partySummary(profiles, mechanicScores) {
    const top = topMechanics(mechanicScores, 5);
    const actionTotals = { generalAttack: 0, battleSkill: 0, linkSkill: 0, ultimate: 0 };
    profiles.forEach((profile) => Object.keys(actionTotals).forEach((id) => { actionTotals[id] += profile.typeWeights[id] || 0; }));
    const rankedActions = Object.entries(actionTotals).sort((a, b) => b[1] - a[1]);
    const dominantAction = rankedActions[0]?.[0] || 'battleSkill';
    const actionLabels = rankedActions
      .filter(([, score], index) => index === 0 || (score >= rankedActions[0][1] * 0.72 && index < 2))
      .slice(0, 2)
      .map(([id]) => MECHANIC_BY_ID.get(id).label);
    const labels = top.map((mechanic) => mechanic.label);
    const partyOutputs = new Set(profiles.flatMap((profile) => profile.skills.flatMap((skill) => [...skill.output])));
    const partySkillText = profiles.flatMap((profile) => profile.skills.map((skill) => skill.text)).join(' ');
    const directStateOutputs = new Set();
    if (/강제\s*연소|연소 상태를 부여|연소 상태로 만/.test(partySkillText)) directStateOutputs.add('combustion');
    if (/강제\s*감전|감전 상태를 부여|감전 상태로 만/.test(partySkillText)) directStateOutputs.add('shock');
    if (/강제\s*동결|동결 상태를 부여|동결 상태로 만/.test(partySkillText)) directStateOutputs.add('freeze');
    if (/강제\s*부식|부식 상태를 부여|부식 상태로 만/.test(partySkillText)) directStateOutputs.add('corrosion');

    let sentence = '';
    if ((mechanicScores.get('defenseless') || 0) >= 6) {
      const consumers = ['smash', 'armorBreak'].filter((id) => (mechanicScores.get(id) || 0) > 2).map((id) => MECHANIC_BY_ID.get(id).label);
      sentence = `띄우기·넘어뜨리기 등으로 방어 불능을 쌓고${consumers.length ? `, ${consumers.join('·')}로 스택을 소모한 뒤` : ''} ${actionLabels.join('·')} 화력을 이어가는 파티입니다.`;
    } else {
      const inflictions = ['heatInfliction', 'electricInfliction', 'frostInfliction', 'natureInfliction'].filter((id) => partyOutputs.has(id));
      const states = ['combustion', 'shock', 'freeze', 'corrosion'].filter((id) => directStateOutputs.has(id));
      if (inflictions.length) {
        sentence = `${inflictions.map((id) => MECHANIC_BY_ID.get(id).label).join('·')}을 준비해${states.length ? ` ${states.map((id) => MECHANIC_BY_ID.get(id).label).join('·')} 조건으로 전환하고,` : ''} ${actionLabels.join('·')}에 화력을 모으는 파티입니다.`;
      } else {
        sentence = `${labels.slice(0, 2).join('·') || '스킬 조건'}을 중심으로 각 캐릭터의 연계 조건을 열고, ${actionLabels.join('·')} 구간에 화력을 집중하는 파티입니다.`;
      }
    }

    return { sentence, actionTotals, dominantAction, top };
  }

  function connectionLabel(source, target) {
    const matched = matchingMechanic(source, target);
    if (matched) return MECHANIC_BY_ID.get(matched)?.label || '조건 연결';
    if (source.mechanics.has('skillGauge') || source.mechanics.has('skillGaugeReturn')) return '스킬 게이지 재투자';
    if (source.mechanics.has('ultimateEnergy')) return '궁극기 준비';
    return '다음 조건 연결';
  }

  function skillTypeLabel(skill) {
    return skill?.type || MECHANIC_BY_ID.get(skill?.typeId)?.label || '전투 행동';
  }

  function replaceSkillNames(text, profiles) {
    let output = cleanText(text);
    const replacements = [];
    profiles.forEach((profile) => profile.skills.forEach((skill) => {
      skillAliases(skill).forEach((alias) => replacements.push({ alias, label: `${profile.character.name}의 ${skillTypeLabel(skill)}` }));
    }));
    replacements.sort((left, right) => right.alias.length - left.alias.length).forEach(({ alias, label }) => {
      output = output.split(alias).join(label);
    });
    return output
      .replaceAll('궁극기을', '궁극기를')
      .replaceAll('스킬를', '스킬을')
      .replaceAll('공격를', '공격을');
  }

  function uniqueTexts(items) {
    const seen = new Set();
    return items.filter((item) => {
      const clean = cleanText(item);
      if (!clean || seen.has(clean)) return false;
      seen.add(clean);
      return true;
    });
  }

  function skillConditionTexts(skill, profiles) {
    if (!skill) return [];
    const badgeConditions = (skill.badges || [])
      .filter((badge) => typeof badge === 'object' && badge.kind === 'condition')
      .map((badge) => cleanText(badge.text));
    const sentenceConditions = sentences(skill.text).filter((sentence) => /사용할 수|발동 조건|상태일 때|상태의 적|상태라면|이 있을 때|소모했을 때|소모한 뒤|횟수를 모두 소모|명중했을 때/.test(sentence));
    return uniqueTexts([...sentenceConditions, ...badgeConditions]).map((text) => replaceSkillNames(text, profiles)).slice(0, 2);
  }

  const IMPORTANT_EFFECT_IDS = new Set([
    'heatInfliction', 'electricInfliction', 'frostInfliction', 'natureInfliction', 'artsInfliction', 'artsAbnormality',
    'combustion', 'shock', 'freeze', 'corrosion', 'defenseless', 'launch', 'knockdown', 'smash', 'armorBreak',
    'artsVulnerability', 'physicalVulnerability', 'heatVulnerability', 'electricVulnerability', 'frostVulnerability', 'natureVulnerability',
    'artsAmplification', 'physicalAmplification', 'heatAmplification', 'electricAmplification', 'frostAmplification', 'natureAmplification',
    'skillGauge', 'skillGaugeReturn', 'ultimateEnergy', 'protection', 'fortification', 'healing', 'weakness', 'comboHit', 'cleanse', 'slow', 'haste', 'mainControl', 'powerStrike'
  ]);

  function skillEffectTexts(skill, profiles, limit = 3) {
    if (!skill) return [];
    const candidates = sentences(skill.text).filter((sentence) => {
      const mechanics = detectMechanics(sentence);
      const important = [...mechanics].some((id) => IMPORTANT_EFFECT_IDS.has(id));
      return important && (/부여|증가|감소|유지|소모|회복|반환|강화|전환|끌어|움직일 수 없|메인 컨트롤|마지막 공격|스택|%|포인트|초/.test(sentence));
    });
    return uniqueTexts(candidates).map((text) => replaceSkillNames(text, profiles)).slice(0, limit);
  }

  function neededMechanics(node) {
    const ids = new Set();
    const setupAndCondition = new Set([
      'heatInfliction', 'electricInfliction', 'frostInfliction', 'natureInfliction', 'artsInfliction', 'artsAbnormality',
      'combustion', 'shock', 'freeze', 'corrosion', 'defenseless', 'launch', 'knockdown', 'imbalance', 'originiumCrystal'
    ]);
    node.requirement.forEach((id) => { if (setupAndCondition.has(id)) ids.add(id); });
    node.consume.forEach((id) => { if (setupAndCondition.has(id)) ids.add(id); });
    if (/준비|조건|쌓기|누적|축적/.test(node.label)) {
      node.mechanics.forEach((id) => { if (setupAndCondition.has(id)) ids.add(id); });
    }
    return [...ids];
  }

  function providerSkillsFor(node, profiles) {
    const targets = neededMechanics(node);
    if (!targets.length) return [];
    const providers = [];
    profiles.forEach((profile) => profile.skills.forEach((skill) => {
      const matched = targets.filter((target) => [...skill.output].some((output) => outputMatchesRequirement(output, target)));
      if (!matched.length) return;
      if (node.skill === skill) return;
      let score = matched.length * 5;
      matched.forEach((id) => { if (skill.output.has(id)) score += 3; });
      if (skill.typeId === 'battleSkill') score += 1.5;
      if (skill.typeId === 'linkSkill') score += 1;
      providers.push({ profile, skill, matched, score });
    }));
    return providers
      .sort((left, right) => right.score - left.score || left.skill.index - right.skill.index)
      .filter((entry, index, list) => list.findIndex((candidate) => candidate.profile.character.id === entry.profile.character.id && candidate.skill.index === entry.skill.index) === index)
      .slice(0, 6);
  }

  function providerSummary(entry, profiles) {
    const { skill, matched } = entry;
    const conditions = skillConditionTexts(skill, profiles);
    const focusLabels = matched.map((id) => MECHANIC_BY_ID.get(id)?.label).filter(Boolean);
    const focusSentences = sentences(skill.text).filter((sentence) => focusLabels.some((label) => sentence.includes(label)) && /부여|쌓|누적|생성|강제|전환|유지/.test(sentence));
    const benefits = skillEffectTexts(skill, profiles, 2).filter((sentence) => !focusSentences.includes(sentence));
    const pieces = uniqueTexts([...conditions.slice(0, 1), ...focusSentences.slice(0, 1), ...benefits.slice(0, 1)]);
    return pieces.map((text) => replaceSkillNames(text, profiles)).join(' ');
  }

  function providerRoutesHtml(node, profiles) {
    const providers = providerSkillsFor(node, profiles);
    if (!providers.length) return '';
    const label = '선택 가능한 조건 준비 경로';
    return `<div class="analysis-route-group"><strong>${esc(label)}</strong><div class="analysis-route-list">
      ${providers.map((entry) => `<article class="analysis-route-bar">
        ${portrait(entry.profile.character, 'analysis-route-portrait')}
        <div><header><span>${esc(entry.profile.character.name)}</span><b>${esc(skillTypeLabel(entry.skill))}</b></header><p>${rich(providerSummary(entry, profiles))}</p><div class="analysis-node-meta">${entry.matched.map((id) => mechanicChip(id)).join('')}</div></div>
      </article>`).join('')}
    </div></div>`;
  }

  function skillNode(profile, skill) {
    const loopNode = profile.steps.find((step) => step.skill === skill);
    if (loopNode) return loopNode;
    const relations = { output: new Set(skill.output), requirement: new Set(skill.requirement), consume: new Set(skill.consume) };
    const support = [...skill.mechanics].some((id) => ['artsVulnerability', 'physicalVulnerability', 'heatVulnerability', 'electricVulnerability', 'frostVulnerability', 'natureVulnerability', 'artsAmplification', 'physicalAmplification', 'heatAmplification', 'electricAmplification', 'frostAmplification', 'natureAmplification', 'slow', 'protection', 'fortification', 'healing', 'cleanse'].includes(id));
    return {
      character: profile.character,
      index: 100 + skill.index,
      label: skill.typeId === 'ultimate' ? (support ? '지원 효과 전개' : '주력 화력 집중') : `${skillTypeLabel(skill)} 조건 활용`,
      detail: skillEffectTexts(skill, [profile], 2).join(' ') || skill.text,
      mechanics: new Set(skill.mechanics),
      stages: new Set(skill.typeId === 'ultimate' ? ['payoff'] : skill.typeId === 'linkSkill' ? ['trigger'] : ['convert']),
      skill,
      ...relations
    };
  }

  function isSupportUltimate(skill) {
    return skill?.typeId === 'ultimate' && [...skill.mechanics].some((id) => [
      'artsVulnerability', 'physicalVulnerability', 'heatVulnerability', 'electricVulnerability', 'frostVulnerability', 'natureVulnerability',
      'artsAmplification', 'physicalAmplification', 'heatAmplification', 'electricAmplification', 'frostAmplification', 'natureAmplification',
      'slow', 'protection', 'fortification', 'healing', 'cleanse', 'weakness'
    ].includes(id));
  }

  function importantUltimateScore(profile, skill) {
    let score = (profile.typeWeights.ultimate || 0) * 2;
    if (isSupportUltimate(skill)) score += 8;
    if (skill.mechanics.has('mainControl')) score += 6;
    if (skill.mechanics.has('generalAttack') || skill.mechanics.has('powerStrike')) score += 5;
    if (/강화|마지막 공격|대량의|치명타|취약|증폭|감속/.test(skill.text)) score += 4;
    score += [...skill.mechanics].filter((id) => IMPORTANT_EFFECT_IDS.has(id)).length * .5;
    return score;
  }

  function enrichCoreNodes(profiles, coreNodes) {
    const outputSet = new Set(profiles.flatMap((profile) => profile.skills.flatMap((skill) => [...skill.output])));
    const additions = [];

    const usableLinks = profiles.flatMap((profile) => profile.skills
      .filter((skill) => skill.typeId === 'linkSkill' && [...skill.requirement].some((requirement) => [...outputSet].some((output) => outputMatchesRequirement(output, requirement))))
      .map((skill) => ({ profile, skill, score: skill.requirement.size * 5 + skill.mechanics.size })))
      .sort((left, right) => right.score - left.score)
      .slice(0, 4);
    usableLinks.forEach(({ profile, skill }) => additions.push(skillNode(profile, skill)));

    const ultimates = profiles.map((profile) => {
      const skill = profile.skills.find((candidate) => candidate.typeId === 'ultimate');
      return skill ? { profile, skill, score: importantUltimateScore(profile, skill) } : null;
    }).filter(Boolean);
    ultimates.filter((entry) => isSupportUltimate(entry.skill)).sort((a, b) => b.score - a.score).slice(0, 2).forEach(({ profile, skill }) => additions.push(skillNode(profile, skill)));
    ultimates.filter((entry) => !isSupportUltimate(entry.skill)).sort((a, b) => b.score - a.score).slice(0, 1).forEach(({ profile, skill }) => additions.push(skillNode(profile, skill)));

    const combined = [...coreNodes, ...additions].filter((node, index, list) => {
      if (node.skill) return list.findIndex((candidate) => candidate.skill && candidate.character.id === node.character.id && candidate.skill.index === node.skill.index) === index;
      return list.findIndex((candidate) => !candidate.skill && candidate.character.id === node.character.id && candidate.label === node.label) === index;
    });

    function phase(node) {
      if (node.skill?.typeId === 'ultimate') return isSupportUltimate(node.skill) ? 4 : 5;
      if (node.stages.has('setup')) return 1;
      if (node.skill?.typeId === 'linkSkill' || node.stages.has('trigger')) return 2;
      if (node.stages.has('convert')) return 3;
      if (node.stages.has('payoff')) return 5;
      if (node.stages.has('recycle')) return 6;
      return 4;
    }
    return combined
      .map((node, index) => ({ node, index, phase: phase(node) }))
      .sort((left, right) => left.phase - right.phase || left.index - right.index)
      .slice(0, 12)
      .map((entry) => entry.node);
  }

  function ultimateTimingText(node, profiles) {
    const skill = node.skill;
    if (skill?.typeId !== 'ultimate') return '';
    const offensiveUltimates = profiles
      .map((profile) => ({ profile, skill: profile.skills.find((candidate) => candidate.typeId === 'ultimate') }))
      .filter((entry) => entry.skill && !isSupportUltimate(entry.skill));
    if (isSupportUltimate(skill)) {
      const target = offensiveUltimates.find((entry) => entry.profile.character.id !== node.character.id);
      const supportLabels = [...skill.mechanics]
        .filter((id) => ['artsVulnerability', 'physicalVulnerability', 'heatVulnerability', 'electricVulnerability', 'frostVulnerability', 'natureVulnerability', 'artsAmplification', 'physicalAmplification', 'heatAmplification', 'electricAmplification', 'frostAmplification', 'natureAmplification', 'slow'].includes(id))
        .map((id) => MECHANIC_BY_ID.get(id)?.label)
        .filter(Boolean)
        .slice(0, 3);
      return `${supportLabels.join('·') || '지원'} 효과를 먼저 적용한 뒤${target ? ` ${target.profile.character.name}의 궁극기` : ' 파티의 주력 공격'}를 이어갑니다.`;
    }

    const damageToSupport = {
      heatDamage: ['heatAmplification', 'heatVulnerability', 'artsAmplification', 'artsVulnerability'],
      electricDamage: ['electricAmplification', 'electricVulnerability', 'artsAmplification', 'artsVulnerability'],
      frostDamage: ['frostAmplification', 'frostVulnerability', 'artsAmplification', 'artsVulnerability'],
      natureDamage: ['natureAmplification', 'natureVulnerability', 'artsAmplification', 'artsVulnerability'],
      artsDamage: ['artsAmplification', 'artsVulnerability'],
      physicalDamage: ['physicalAmplification', 'physicalVulnerability']
    };
    const wanted = new Set();
    Object.entries(damageToSupport).forEach(([damage, supportIds]) => {
      if (skill.mechanics.has(damage)) supportIds.forEach((id) => wanted.add(id));
    });
    const supportEntries = profiles.flatMap((profile) => profile.skills
      .filter((candidate) => candidate.typeId === 'ultimate' && candidate !== skill)
      .map((candidate) => ({ profile, skill: candidate, matched: [...candidate.mechanics].filter((id) => wanted.has(id)) })))
      .filter((entry) => entry.matched.length);
    if (!supportEntries.length) return '적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.';
    const names = [...new Set(supportEntries.map((entry) => entry.profile.character.name))].join('·');
    const labels = [...new Set(supportEntries.flatMap((entry) => entry.matched.map((id) => MECHANIC_BY_ID.get(id)?.label).filter(Boolean)))].slice(0, 3).join('·');
    return `${names}의 궁극기로 ${labels} 효과가 적용된 동안 사용해 주력 피해를 집중합니다.`;
  }

  function coreNodeHtml(node, position, profiles) {
    const skill = node.skill;
    const conditions = skillConditionTexts(skill, profiles);
    const effects = skillEffectTexts(skill, profiles, skill?.typeId === 'ultimate' ? 4 : 2).filter((text) => !conditions.includes(text));
    const timing = ultimateTimingText(node, profiles);
    const detailSections = [
      conditions.length ? `<div class="analysis-node-condition"><strong>${skill?.typeId === 'linkSkill' ? '연계 스킬 발동 조건' : '효과 발동 조건'}</strong><p>${conditions.map(rich).join('<br>')}</p></div>` : '',
      timing ? `<div class="analysis-node-timing"><strong>사용 시점</strong><p>${rich(timing)}</p></div>` : '',
      effects.length ? `<div class="analysis-node-effects"><strong>핵심 효과</strong><ul>${effects.map((text) => `<li>${rich(text)}</li>`).join('')}</ul></div>` : '',
      providerRoutesHtml(node, profiles)
    ].filter(Boolean).join('');

    return `<article class="analysis-flow-node">
      <div class="analysis-flow-index">${String(position + 1).padStart(2, '0')}</div>
      ${portrait(node.character, 'analysis-node-portrait')}
      <div class="analysis-flow-copy">
        <header><span>${esc(node.character.name)}</span><strong>${esc(skill ? skillTypeLabel(skill) : '전투 준비')}</strong><em>${esc(replaceSkillNames(node.label, profiles))}</em></header>
        <p>${rich(replaceSkillNames(node.detail, profiles))}</p>
        ${detailSections ? `<details class="analysis-node-details">
          <summary><span class="analysis-node-summary-copy"><span class="analysis-node-summary-title">효과 및 준비 경로</span><span class="analysis-node-summary-state" aria-hidden="true"></span></span><i aria-hidden="true"></i></summary>
          <div class="analysis-node-details-content">${detailSections}</div>
        </details>` : ''}
      </div>
    </article>`;
  }

  function partyRole(profile, allProfiles) {
    const outputs = new Set(profile.skills.flatMap((skill) => [...skill.output]));
    const consumes = new Set(profile.skills.flatMap((skill) => [...skill.consume]));
    const mechanics = profile.mechanics;
    const labels = [];

    const setup = ['heatInfliction', 'electricInfliction', 'frostInfliction', 'natureInfliction', 'defenseless', 'originiumCrystal'].filter((id) => outputs.has(id));
    const states = ['combustion', 'shock', 'freeze', 'corrosion'].filter((id) => outputs.has(id) || mechanics.has(id));
    const amps = ['artsVulnerability', 'physicalVulnerability', 'heatVulnerability', 'electricVulnerability', 'frostVulnerability', 'natureVulnerability', 'artsAmplification', 'physicalAmplification', 'heatAmplification', 'electricAmplification', 'frostAmplification', 'natureAmplification'].filter((id) => mechanics.has(id));
    const resources = ['skillGauge', 'skillGaugeReturn', 'ultimateEnergy'].filter((id) => mechanics.has(id));
    const survival = ['protection', 'fortification', 'healing', 'cleanse', 'weakness'].filter((id) => mechanics.has(id));

    if (setup.length) labels.push(`${setup.map((id) => MECHANIC_BY_ID.get(id).label).join('·')} 생성`);
    if (consumes.size) labels.push(`${[...consumes].slice(0, 2).map((id) => MECHANIC_BY_ID.get(id)?.label).filter(Boolean).join('·')} 소모`);
    if (states.length) labels.push(`${states.map((id) => MECHANIC_BY_ID.get(id).label).join('·')} 활용`);
    if (amps.length) labels.push(`${amps.slice(0, 2).map((id) => MECHANIC_BY_ID.get(id).label).join('·')} 지원`);
    if (resources.length) labels.push('전투 자원 순환');
    if (survival.length) labels.push('생존 지원');
    if (mechanics.has('mainControl')) labels.push('메인 컨트롤 후보');
    if (!labels.length) labels.push(`${FILTER_GROUPS[1].items.find((item) => item.id === profile.classification.role)?.label || '전투'} 역할`);

    const crossLinks = allProfiles.filter((other) => other.character.id !== profile.character.id).flatMap((other) => {
      const matches = [];
      profile.skills.forEach((skill) => other.skills.forEach((otherSkill) => {
        const match = matchingMechanic(skill, otherSkill);
        if (match) matches.push({ other: other.character.name, mechanic: MECHANIC_BY_ID.get(match)?.label });
      }));
      return matches;
    });
    const relation = crossLinks[0]
      ? `${crossLinks[0].other}의 ${crossLinks[0].mechanic} 조건과 직접 이어집니다.`
      : `${labels[0]}을 맡아 파티의 주력 순환을 보조합니다.`;
    return { labels: labels.slice(0, 4), relation };
  }

  function aggregateWeaknesses(profiles) {
    const groups = [
      { id: 'setup', title: '예열·상태 준비', regex: /스택|부착|상태|방어 불능|예열|준비|조건/ },
      { id: 'resource', title: '스킬 게이지·궁극기 순환', regex: /스킬 게이지|궁극기 에너지|쿨타임|자원|회복|반환/ },
      { id: 'control', title: '메인 컨트롤·조작 집중', regex: /메인 컨트롤|조작|입력|타이밍|차지|낙하/ },
      { id: 'position', title: '위치·대상 수', regex: /위치|범위|대상 수|단일|다수|명중|설치|지연/ },
      { id: 'survival', title: '생존·피격 조건', regex: /생존|피격|보호|치유|생명력|받았|공격받/ },
      { id: 'potential', title: '잠재력 의존', regex: /잠재력|P\d/ }
    ];
    const results = [];
    groups.forEach((group) => {
      const matches = [];
      profiles.forEach((profile) => (profile.character.weaknesses || []).forEach((weakness) => {
        const text = `${weakness.axis} ${weakness.evidence} ${weakness.implication}`;
        if (group.regex.test(text)) matches.push({ character: profile.character, weakness });
      }));
      if (matches.length) results.push({ ...group, matches });
    });
    return results.sort((a, b) => b.matches.length - a.matches.length).slice(0, 5);
  }

  const SPECIAL_ALTERNATIVES = {
    '레바테인': {
      title: '연소를 유지한 연계 스킬 화력 축',
      description: '주력 순환은 궁극기 이후 강화 일반 공격에 무게가 실리지만, 연소 또는 부식 상태의 적에게 연계 스킬을 발동해 별도의 열기 피해와 궁극기 에너지 수급을 만들 수 있습니다.',
      opportunity: '일반 공격이나 궁극기의 비중을 낮추는 전투 설계에서는 연소를 곧바로 흡수하지 않고 유지하며 연계 스킬을 반복하는 운용이 새롭게 부각될 수 있습니다.',
      skillName: '연계 스킬'
    }
  };

  function alternativeUse(profile, allProfiles) {
    const special = SPECIAL_ALTERNATIVES[profile.character.name];
    if (special) return special;

    const dominant = Object.entries(profile.typeWeights).sort((a, b) => b[1] - a[1])[0]?.[0] || 'battleSkill';
    const partyOutputs = new Set(allProfiles.flatMap((other) => other.skills.flatMap((skill) => [...skill.output])));
    const candidates = profile.skills.filter((skill) => skill.typeId && skill.typeId !== 'generalAttack');
    candidates.forEach((skill) => {
      skill.altScore = (skill.typeId === dominant ? -2 : 3)
        + [...skill.requirement].filter((id) => [...partyOutputs].some((output) => outputMatchesRequirement(output, id))).length * 5
        + skill.mechanics.size * 0.3
        + (skill.typeId === 'linkSkill' ? 2 : 0);
    });
    const skill = candidates.sort((a, b) => b.altScore - a.altScore)[0] || profile.skills[0];
    const requirements = [...skill.requirement].map((id) => MECHANIC_BY_ID.get(id)?.label).filter(Boolean);
    const outputs = [...skill.output]
      .filter((id) => !['generalAttack', 'battleSkill', 'linkSkill', 'ultimate'].includes(id))
      .map((id) => MECHANIC_BY_ID.get(id)?.label)
      .filter(Boolean);
    const dominantLabel = MECHANIC_BY_ID.get(dominant)?.label || '주력 스킬';
    const condition = requirements.length ? `${requirements.slice(0, 2).join('·')} 조건` : `${outputs.slice(0, 2).join('·') || '보조 효과'}`;
    return {
      title: `${skill.type} 재평가`,
      description: `현재 순환은 ${dominantLabel} 비중이 높지만, ${skill.type}은 ${condition}을 이용하는 별도 기능을 갖고 있습니다.`,
      opportunity: requirements.some((id) => [...partyOutputs].some((output) => outputMatchesRequirement(output, id)))
        ? `현재 파티원이 이 조건을 공급할 수 있어 주력 피해원이 압박받는 전투에서 대체 연결로 검토할 가치가 있습니다.`
        : `주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.`,
      skillName: skill.type
    };
  }

  function designHints(profiles, summary, mechanicScores, alternatives) {
    const hints = [];
    const action = summary.actionTotals;
    const topActionEntries = Object.entries(action).sort((a, b) => b[1] - a[1]);
    const altText = alternatives.slice(0, 2).map((item) => `${item.character.name}의 ${item.data.skillName}`).join(', ');

    function add(id, title, pressure, impact, opportunity, caution, characters) {
      if (hints.some((hint) => hint.id === id)) return;
      hints.push({ id, title, pressure, impact, opportunity, caution, characters });
    }

    if ((action.generalAttack || 0) >= 5) {
      const names = profiles.filter((profile) => profile.typeWeights.generalAttack >= 2).map((profile) => profile.character);
      add('normal', '일반 공격 의존도', '일반 공격 피해 비중을 낮추는 방향', '강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.', altText ? `${altText}처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.` : '연계 스킬과 배틀 스킬의 조건부 피해를 다시 살펴볼 수 있습니다.', '일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.', names);
    }

    if ((action.ultimate || 0) >= 6) {
      const names = profiles.filter((profile) => profile.typeWeights.ultimate >= 2).map((profile) => profile.character);
      add('ultimate', '궁극기 반복 의존도', '궁극기 반복 사용의 효율이 점차 낮아지는 방향', '궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.', '궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.', '첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.', names);
    }

    if ((action.battleSkill || 0) >= 7) {
      const names = profiles.filter((profile) => profile.typeWeights.battleSkill >= 2).map((profile) => profile.character);
      add('battle', '배틀 스킬 피해 비중', '배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향', '스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.', '배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.', '배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.', names);
    }

    if ((action.linkSkill || 0) >= 6) {
      const names = profiles.filter((profile) => profile.typeWeights.linkSkill >= 2).map((profile) => profile.character);
      add('link', '연계 스킬 빈도', '연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향', '조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.', '연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.', '연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.', names);
    }

    const stackScore = (mechanicScores.get('artsInfliction') || 0) + (mechanicScores.get('defenseless') || 0);
    if (stackScore >= 8) {
      const names = profiles.filter((profile) => ['artsInfliction', 'defenseless', 'heatInfliction', 'electricInfliction', 'frostInfliction', 'natureInfliction'].some((id) => profile.mechanics.has(id))).map((profile) => profile.character);
      add('stack', '부착·방어 불능 축적 속도', '같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향', '최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.', '낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.', '부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.', names);
    }

    if (profiles.filter((profile) => profile.mechanics.has('mainControl')).length >= 2) {
      const names = profiles.filter((profile) => profile.mechanics.has('mainControl')).map((profile) => profile.character);
      add('main', '메인 컨트롤 점유', '전투 중 메인 컨트롤 교체를 어렵게 하거나 한 명에게 고정하는 방향', '메인 컨트롤 전환을 요구하는 궁극기와 강력한 일격 조건이 서로 경쟁합니다.', '비조작 상태에서도 작동하는 설치물·연계 스킬·지원 효과를 중심으로 역할을 재배치할 수 있습니다.', '핵심 캐릭터를 잘못 고정하면 플레이 선택보다 편성 실패만 강요할 수 있으므로 후보별 차이가 남아야 합니다.', names);
    }

    const controlIds = ['freeze', 'launch', 'knockdown', 'slow'];
    if (controlIds.reduce((sum, id) => sum + (mechanicScores.get(id) || 0), 0) >= 8) {
      const names = profiles.filter((profile) => controlIds.some((id) => profile.mechanics.has(id))).map((profile) => profile.character);
      add('control', '제어 유지 시간', '적을 오래 제어할수록 별도의 대가가 생기는 방향', '동결·끌어당김·띄우기·넘어뜨리기를 길게 유지하는 운용이 불리해집니다.', '제어를 즉시 소모해 쇄빙·강타 같은 폭발 피해로 바꾸는 빠른 전환이 새로운 선택이 될 수 있습니다.', '모든 제어 면역은 제어 캐릭터의 정체성을 지우므로 유지와 즉시 소모 사이에 선택을 남기는 편이 좋습니다.', names);
    }

    const survivalScore = ['protection', 'fortification', 'healing'].reduce((sum, id) => sum + (mechanicScores.get(id) || 0), 0);
    if (survivalScore >= 7) {
      const names = profiles.filter((profile) => ['protection', 'fortification', 'healing'].some((id) => profile.mechanics.has(id))).map((profile) => profile.character);
      add('survival', '대형 치유·보호 사용', '큰 회복이나 보호를 사용할 때 전장에 반대급부가 생기는 방향', '안전하게 버티는 행동이 시간이나 적 회복과 교환됩니다.', '피해 감소·허약·회피처럼 회복 이외의 생존 수단을 조합하는 가치가 높아집니다.', '생존 수단 전체를 동시에 처벌하면 공격적인 대안보다 단순 생존 불가로 이어질 수 있습니다.', names);
    }

    const resourceScore = (mechanicScores.get('skillGauge') || 0) + (mechanicScores.get('skillGaugeReturn') || 0) + (mechanicScores.get('ultimateEnergy') || 0);
    if (resourceScore >= 12) {
      const names = profiles.filter((profile) => ['skillGauge', 'skillGaugeReturn', 'ultimateEnergy'].some((id) => profile.mechanics.has(id))).map((profile) => profile.character);
      add('resource', '전투 자원 확보 방식', '스킬 게이지 자연 회복을 줄이고 강력한 일격·처형·개별 회복에 의존하게 하는 방향', '배틀 스킬을 연속으로 쓰는 순환의 간격이 길어집니다.', '게이지 회복과 반환의 차이, 처형·연계 스킬에서 얻는 자원 수급이 실제 선택 요소가 됩니다.', '자연 회복과 모든 능동 회복을 동시에 막으면 분석 가능한 순환 자체가 없어집니다.', names);
    }

    if (!hints.length) {
      add('tempo', '주력 화력 구간의 템포', `${MECHANIC_BY_ID.get(topActionEntries[0]?.[0] || 'battleSkill').label}의 연속 사용 빈도를 낮추는 방향`, '가장 강한 행동을 반복하기 어려워져 다른 스킬을 섞어야 합니다.', '사용 빈도가 낮은 연계·지원 효과를 사이사이에 배치하는 운용을 발견할 수 있습니다.', '파티의 모든 피해원을 한꺼번에 낮추기보다 한 가지 행동 축만 건드리는 편이 비교가 쉽습니다.', profiles.map((profile) => profile.character));
    }

    return hints.slice(0, 5);
  }

  function analyzeParty(characters) {
    const profiles = characters.map((character) => PROFILE_BY_ID.get(character.id));
    const mechanicScores = partyMechanicScores(profiles);
    const summary = partySummary(profiles, mechanicScores);
    const coreNodes = enrichCoreNodes(profiles, chooseCoreNodes(profiles, mechanicScores));
    const coreCharacterIds = new Set(coreNodes.map((node) => node.character.id));
    const supportSteps = profiles
      .filter((profile) => !coreCharacterIds.has(profile.character.id))
      .map((profile) => profile.steps.sort((a, b) => {
        const aScore = [...a.mechanics].reduce((sum, id) => sum + (mechanicScores.get(id) || 0), 0);
        const bScore = [...b.mechanics].reduce((sum, id) => sum + (mechanicScores.get(id) || 0), 0);
        return bScore - aScore;
      })[0])
      .filter(Boolean);
    const roles = profiles.map((profile) => ({ profile, role: partyRole(profile, profiles) }));
    const weaknesses = aggregateWeaknesses(profiles);
    const alternatives = profiles.map((profile) => ({ character: profile.character, data: alternativeUse(profile, profiles) }));
    const hints = designHints(profiles, summary, mechanicScores, alternatives);
    return { profiles, mechanicScores, summary, coreNodes, supportSteps, roles, weaknesses, alternatives, hints };
  }

  function diagramNodeHtml(node, profiles, variant = 'main') {
    return `<article class="analysis-diagram-node analysis-diagram-node--${esc(variant)}">
      ${portrait(node.character, variant === 'branch' ? 'analysis-diagram-portrait analysis-diagram-portrait--branch' : 'analysis-diagram-portrait')}
      <div class="analysis-diagram-copy">
        <span>${esc(node.character.name)}</span>
        <strong>${esc(node.skill ? skillTypeLabel(node.skill) : '전투 준비')}</strong>
      </div>
    </article>`;
  }

  function diagramBranchItemHtml(entry) {
    return `<article class="analysis-diagram-branch-item">
      ${portrait(entry.profile.character, 'analysis-diagram-portrait analysis-diagram-portrait--branch')}
      <div class="analysis-diagram-copy">
        <span>${esc(entry.profile.character.name)}</span>
        <strong>${esc(skillTypeLabel(entry.skill))}</strong>
      </div>
    </article>`;
  }

  function diagramTransitionHtml(source, target, profiles) {
    const providers = providerSkillsFor(target, profiles);
    const label = '선택 가능한 조건 준비 경로';
    return `<div class="analysis-diagram-transition">
      <div class="analysis-diagram-link"><span>${esc(connectionLabel(source, target))}</span></div>
      ${providers.length ? `<div class="analysis-diagram-branch">
        <div class="analysis-diagram-branch-stem" aria-hidden="true"></div>
        <div class="analysis-diagram-branch-label">${esc(label)}</div>
        <div class="analysis-diagram-branch-list">
          ${providers.map((entry) => diagramBranchItemHtml(entry)).join('')}
        </div>
      </div>` : ''}
    </div>`;
  }

  function analysisDiagramHtml(analysis) {
    if (!analysis.coreNodes.length) return '';
    return `<section class="analysis-section analysis-diagram-section">
      <header class="analysis-section-heading"><span>DI</span><div><h3>간단 다이어그램</h3><p>주력 전투 흐름의 핵심 노드와, 다음 단계로 이어지기 위한 선택 가능한 조건 준비 경로를 함께 보여줍니다.</p></div></header>
      <div class="analysis-diagram-shell">
        <div class="analysis-diagram-row">
          ${analysis.coreNodes.map((node, index) => `${diagramNodeHtml(node, analysis.profiles)}${index < analysis.coreNodes.length - 1 ? diagramTransitionHtml(node, analysis.coreNodes[index + 1], analysis.profiles) : ''}`).join('')}
        </div>
      </div>
    </section>`;
  }


  function serializableCharacter(character, order) {
    return {
      id: character?.id || '',
      name: character?.name || '',
      order
    };
  }

  function serializableSkill(skill) {
    if (!skill) return null;
    return {
      name: cleanText(skill.name),
      type: skillTypeLabel(skill),
      typeId: skill.typeId || '',
      index: Number.isFinite(skill.index) ? skill.index : null
    };
  }

  function serializablePreparationRoute(entry, profiles) {
    return {
      character: serializableCharacter(entry.profile.character),
      skill: serializableSkill(entry.skill),
      matchedMechanics: (entry.matched || []).map((id) => ({
        id,
        label: MECHANIC_BY_ID.get(id)?.label || id
      })),
      summary: providerSummary(entry, profiles)
    };
  }

  function serializableFlowNode(node, index, profiles) {
    const skill = node.skill;
    const conditions = skillConditionTexts(skill, profiles);
    const effects = skillEffectTexts(skill, profiles, skill?.typeId === 'ultimate' ? 4 : 3).filter((text) => !conditions.includes(text));
    return {
      order: index + 1,
      character: serializableCharacter(node.character),
      stageIds: [...(node.stages || [])],
      title: replaceSkillNames(node.label, profiles),
      detail: replaceSkillNames(node.detail, profiles),
      skill: serializableSkill(skill),
      conditions,
      timing: ultimateTimingText(node, profiles),
      effects,
      mechanics: [...(node.mechanics || [])].map((id) => ({ id, label: MECHANIC_BY_ID.get(id)?.label || id })),
      preparationRoutes: providerSkillsFor(node, profiles).map((entry) => serializablePreparationRoute(entry, profiles))
    };
  }

  function buildAnalysisExport(characters, analysis) {
    const dependencyItems = [
      ...analysis.summary.top.slice(0, 4).map((mechanic) => ({
        id: mechanic.id,
        label: mechanic.label,
        color: mechanic.color,
        level: mechanic.score >= 10 ? '매우 높음' : mechanic.score >= 6 ? '높음' : '보통',
        score: mechanic.score
      })),
      {
        id: analysis.summary.dominantAction,
        label: MECHANIC_BY_ID.get(analysis.summary.dominantAction)?.label || analysis.summary.dominantAction,
        color: MECHANIC_BY_ID.get(analysis.summary.dominantAction)?.color || 'navy',
        level: '주력 행동',
        score: analysis.summary.actionTotals[analysis.summary.dominantAction] || 0
      }
    ].slice(0, 5);
    const flow = analysis.coreNodes.map((node, index) => serializableFlowNode(node, index, analysis.profiles));
    const signature = characters.map((character) => character.id).join('-');
    const mechanicScores = Object.fromEntries([...analysis.mechanicScores.entries()].sort((left, right) => right[1] - left[1]));
    const mechanicIds = Object.entries(mechanicScores).filter(([, score]) => score > 0).map(([id]) => id);

    return {
      schemaVersion: 1,
      id: `party-${signature}`,
      exportedAt: new Date().toISOString(),
      title: `${characters.map((character) => character.name).join(' · ')} 파티 분석`,
      party: characters.map((character, index) => serializableCharacter(character, index + 1)),
      summary: {
        title: '파티 전투 구조 분석',
        sentence: analysis.summary.sentence,
        dominantAction: analysis.summary.dominantAction,
        actionTotals: analysis.summary.actionTotals,
        dependencies: dependencyItems
      },
      diagram: {
        nodes: flow.map((node) => ({
          order: node.order,
          character: node.character,
          skill: node.skill,
          title: node.title
        })),
        connections: analysis.coreNodes.slice(0, -1).map((node, index) => ({
          fromOrder: index + 1,
          toOrder: index + 2,
          label: connectionLabel(node, analysis.coreNodes[index + 1]),
          preparationRoutes: providerSkillsFor(analysis.coreNodes[index + 1], analysis.profiles).map((entry) => serializablePreparationRoute(entry, analysis.profiles))
        }))
      },
      combatFlow: flow,
      supportFlow: analysis.supportSteps.map((node, index) => serializableFlowNode(node, index, analysis.profiles)),
      basicOperation: flow.map((node) => ({
        order: node.order,
        title: `${node.character.name} · ${node.skill?.type || '전투 준비'}`,
        detail: node.detail
      })),
      roles: analysis.roles.map(({ profile, role }) => ({
        character: serializableCharacter(profile.character),
        labels: role.labels,
        relation: role.relation
      })),
      weaknesses: analysis.weaknesses.map((group) => ({
        title: group.title,
        entries: group.matches.map(({ character, weakness }) => ({
          character: serializableCharacter(character),
          axis: weakness.axis,
          evidence: cleanText(weakness.evidence),
          affected: cleanText(weakness.affected),
          implication: cleanText(weakness.implication)
        }))
      })),
      discoveries: analysis.alternatives.map(({ character, data }) => ({
        character: serializableCharacter(character),
        title: data.title,
        description: data.description,
        opportunity: data.opportunity,
        skillName: data.skillName
      })),
      designHints: analysis.hints.map((hint) => ({
        id: hint.id,
        title: hint.title,
        pressure: hint.pressure,
        impact: hint.impact,
        opportunity: hint.opportunity,
        caution: hint.caution,
        characters: hint.characters.map((character) => serializableCharacter(character))
      })),
      mechanicProfile: {
        mechanicIds,
        mechanicScores,
        dominantAction: analysis.summary.dominantAction,
        actionTotals: analysis.summary.actionTotals,
        hintIds: analysis.hints.map((hint) => hint.id),
        hintTitles: analysis.hints.map((hint) => hint.title),
        weaknessAxes: analysis.weaknesses.flatMap((group) => group.matches.map(({ weakness }) => weakness.axis)),
        dependencyLabels: dependencyItems.map((item) => item.label)
      }
    };
  }

  function downloadAnalysisJson(payload) {
    const safeName = (payload.party || []).map((member) => member.name).join('-').replace(/[\\/:*?"<>|]/g, '-');
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${safeName || '파티-분석'}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function analysisHtml(characters, preparedAnalysis) {
    const analysis = preparedAnalysis || analyzeParty(characters);
    const dependencyItems = [
      ...analysis.summary.top.slice(0, 4).map((mechanic) => ({ label: mechanic.label, color: mechanic.color, level: mechanic.score >= 10 ? '매우 높음' : mechanic.score >= 6 ? '높음' : '보통' })),
      { label: MECHANIC_BY_ID.get(analysis.summary.dominantAction).label, color: MECHANIC_BY_ID.get(analysis.summary.dominantAction).color, level: '주력 행동' }
    ].slice(0, 5);

    return `<div class="analysis-result-heading">
      <div class="analysis-result-copy"><small>PARTY RESULT</small><h2>파티 전투 구조 분석</h2><p>${rich(analysis.summary.sentence)}</p></div>
      <button type="button" id="toggle-party-analysis" class="analysis-toggle-button" aria-expanded="true" aria-controls="party-analysis-content">분석 접기</button>
    </div>

    <div id="party-analysis-content" class="analysis-content">
    <section class="analysis-overview" aria-label="핵심 의존 요소">
      <div class="analysis-overview-title"><span>한눈에 보기</span><strong>핵심 의존 요소</strong></div>
      <div class="analysis-dependency-list">
        ${dependencyItems.map((item) => `<div><span data-color="${esc(item.color)}">${esc(item.label)}</span><b>${esc(item.level)}</b></div>`).join('')}
      </div>
    </section>

    ${analysisDiagramHtml(analysis)}

    <section class="analysis-section">
      <header class="analysis-section-heading"><span>01</span><div><h3>주력 전투 흐름</h3><p>초상화 왼쪽, 스킬 종류·발동 조건·준비 선택지·핵심 효과를 오른쪽에 한 방향 흐름으로 정리했습니다.</p></div></header>
      <div class="analysis-flow">
        ${analysis.coreNodes.map((node, index) => `${coreNodeHtml(node, index, analysis.profiles)}${index < analysis.coreNodes.length - 1 ? `<div class="analysis-flow-arrow"><span>${esc(connectionLabel(node, analysis.coreNodes[index + 1]))}</span></div>` : ''}`).join('')}
      </div>
      ${analysis.supportSteps.length ? `<div class="analysis-support-block"><strong>보조 연결</strong>${analysis.supportSteps.map((node) => coreNodeHtml(node, analysis.coreNodes.length, analysis.profiles)).join('')}</div>` : ''}
    </section>

    <section class="analysis-section">
      <header class="analysis-section-heading"><span>02</span><div><h3>기본 운용 순서</h3><p>다이어그램의 핵심만 짧은 문장으로 다시 설명합니다.</p></div></header>
      <ol class="analysis-operation-list">
        ${analysis.coreNodes.map((node, index) => `<li><span>${index + 1}</span><div><strong>${esc(node.character.name)} · ${esc(node.skill ? skillTypeLabel(node.skill) : '전투 준비')}</strong><p>${rich(replaceSkillNames(node.detail, analysis.profiles))}</p></div></li>`).join('')}
      </ol>
    </section>

    <section class="analysis-section">
      <header class="analysis-section-heading"><span>03</span><div><h3>파티 구성원 역할</h3><p>공식 역할군이 아니라 이 조합 안에서 실제로 맡는 기능입니다.</p></div></header>
      <div class="analysis-role-list">
        ${analysis.roles.map(({ profile, role }) => `<article class="analysis-info-bar">
          ${portrait(profile.character, 'analysis-info-portrait')}
          <div><header><strong>${esc(profile.character.name)}</strong>${identityIcons(profile.character)}</header><div class="analysis-role-chips">${role.labels.map((label) => `<span>${esc(label)}</span>`).join('')}</div><p>${esc(role.relation)}</p></div>
        </article>`).join('')}
      </div>
    </section>

    <section class="analysis-section">
      <header class="analysis-section-heading"><span>04</span><div><h3>구조적 약점</h3><p>특정 제약을 고르기 전, 이 파티가 원래부터 부담을 느끼는 축입니다.</p></div></header>
      <div class="analysis-weakness-list">
        ${analysis.weaknesses.map((group) => `<article class="analysis-weakness-bar"><header><small>취약 축</small><strong>${esc(group.title)}</strong></header><div>${group.matches.slice(0, 3).map(({ character, weakness }) => `<div class="analysis-weakness-entry"><strong>${esc(character.name)} · ${esc(weakness.axis)}</strong><p>${rich(weakness.implication)}</p></div>`).join('')}</div></article>`).join('')}
      </div>
    </section>

    <section class="analysis-section analysis-discovery-section">
      <header class="analysis-section-heading"><span>05</span><div><h3>새롭게 활용할 수 있는 연결</h3><p>현재 주력 루프에서 비중이 낮지만, 전투 조건이 달라졌을 때 살아날 수 있는 스킬입니다.</p></div></header>
      <div class="analysis-discovery-list">
        ${analysis.alternatives.map(({ character, data }) => `<article class="analysis-info-bar analysis-discovery-bar">
          ${portrait(character, 'analysis-info-portrait')}
          <div><header><strong>${esc(character.name)} · ${esc(data.title)}</strong></header><p>${rich(data.description)}</p><aside>${rich(data.opportunity)}</aside></div>
        </article>`).join('')}
      </div>
    </section>

    <section class="analysis-section analysis-hints-section">
      <header class="analysis-section-heading"><span>06</span><div><h3>제약 설계 힌트</h3><p>제약을 먼저 고르는 것이 아니라, 어떤 전투 축을 건드리면 새로운 운용이 발견될지 보여줍니다.</p></div></header>
      <div class="analysis-hint-list">
        ${analysis.hints.map((hint) => `<article class="analysis-hint-card">
          <header><span>검토 축</span><h4>${esc(hint.title)}</h4><div class="analysis-hint-faces">${hint.characters.slice(0, 4).map((character) => portrait(character, 'analysis-hint-portrait')).join('')}</div></header>
          <div class="analysis-hint-grid">
            <div><strong>건드려볼 방향</strong><p>${rich(hint.pressure)}</p></div>
            <div><strong>어려워지는 부분</strong><p>${rich(hint.impact)}</p></div>
            <div class="opportunity"><strong>발견 가능성</strong><p>${rich(hint.opportunity)}</p></div>
            <div class="caution"><strong>과잉 압박 주의</strong><p>${rich(hint.caution)}</p></div>
          </div>
        </article>`).join('')}
      </div>
    </section>
    </div>`;
  }

  function initPartyBuilder() {
    const slots = [null, null, null, null];
    let analyzedSignature = '';
    let currentAnalysisPayload = null;
    let pickerOpen = true;
    const slotButtons = [...document.querySelectorAll('.party-slot')];
    const pickerCards = [...document.querySelectorAll('.party-character-card')];
    const count = document.getElementById('party-count');
    const guidance = document.getElementById('party-guidance');
    const analyzeButton = document.getElementById('analyze-party');
    const analysisSection = document.getElementById('party-analysis');
    const pickerPanel = document.getElementById('party-picker-panel');
    const pickerToggle = document.getElementById('toggle-party-picker');
    const pickerToggleLabel = pickerToggle.querySelector('i');
    const toast = document.getElementById('party-toast');
    let toastTimer = null;

    function signature() {
      return slots.map((character) => character?.id || '-').join('|');
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
    }

    function setPickerOpen(next, scroll = false) {
      pickerOpen = next;
      pickerPanel.hidden = !next;
      pickerToggle.setAttribute('aria-expanded', String(next));
      pickerToggle.classList.toggle('collapsed', !next);
      pickerToggleLabel.textContent = next ? '목록 접기' : '목록 펼치기';
      if (scroll && next) pickerToggle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function removeSlotAt(index) {
      if (index < 0 || !slots[index]) return null;
      const [removed] = slots.splice(index, 1);
      slots.push(null);
      return removed;
    }

    function initAnalysisToggle() {
      const toggle = document.getElementById('toggle-party-analysis');
      const content = document.getElementById('party-analysis-content');
      if (!toggle || !content) return;
      const syncState = (open) => {
        content.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        toggle.textContent = open ? '분석 접기' : '분석 펼치기';
        analysisSection.classList.toggle('analysis-collapsed', !open);
      };
      syncState(!content.hidden);
      toggle.addEventListener('click', () => syncState(content.hidden));
    }

    function setAnalyzeButton(label, options = {}) {
      const complete = Boolean(options.complete);
      analyzeButton.classList.toggle('analysis-complete', complete);
      if (complete) {
        analyzeButton.innerHTML = '<span class="party-analyze-label party-analyze-label--default">분석 완료</span><span class="party-analyze-label party-analyze-label--export">분석 내보내기</span>';
        analyzeButton.setAttribute('aria-label', '분석 내보내기');
        analyzeButton.title = '마우스를 올리면 분석 내보내기로 전환됩니다.';
      } else {
        analyzeButton.innerHTML = `<span class="party-analyze-label">${esc(label)}</span>`;
        analyzeButton.setAttribute('aria-label', label);
        analyzeButton.removeAttribute('title');
      }
    }

    function renderSlots() {
      slotButtons.forEach((button, index) => {
        const character = slots[index];
        button.classList.toggle('empty', !character);
        button.classList.toggle('filled', Boolean(character));
        if (!character) {
          button.innerHTML = `<span class="party-slot-number">${index + 1}</span><span class="party-slot-empty-content"><span class="party-slot-empty-mark">+</span><span class="party-slot-empty-text">파티원 선택</span></span>`;
          button.setAttribute('aria-label', `${index + 1}번 파티 슬롯, 비어 있음`);
        } else {
          button.innerHTML = `${portrait(character, 'party-slot-portrait')}<span class="party-slot-overlay">클릭하여 해제</span><span class="party-slot-name">${esc(character.name)}</span>`;
          button.setAttribute('aria-label', `${index + 1}번 파티 슬롯, ${character.name}. 클릭하여 편성 해제`);
        }
      });

      const selectedIds = new Set(slots.filter(Boolean).map((character) => character.id));
      pickerCards.forEach((card) => {
        const active = selectedIds.has(card.dataset.characterId);
        card.classList.toggle('selected', active);
        card.setAttribute('aria-pressed', String(active));
      });

      const filled = slots.filter(Boolean).length;
      count.textContent = `${filled} / 4`;
      const currentSignature = signature();
      const stale = analyzedSignature && currentSignature !== analyzedSignature;
      analysisSection.classList.toggle('stale', Boolean(stale));
      let staleBanner = analysisSection.querySelector('.analysis-stale-banner');
      if (stale && !analysisSection.hidden) {
        if (!staleBanner) {
          staleBanner = document.createElement('div');
          staleBanner.className = 'analysis-stale-banner';
          staleBanner.innerHTML = '<strong>편성이 변경되었습니다.</strong><span>아래 결과는 이전 파티 기준입니다. 네 명을 채운 뒤 파티 재분석을 눌러주세요.</span>';
          analysisSection.prepend(staleBanner);
        }
      } else if (staleBanner) {
        staleBanner.remove();
      }

      if (filled < 4) {
        guidance.textContent = '빈 슬롯에 배치할 캐릭터를 아래 목록에서 선택하세요.';
        analyzeButton.disabled = true;
        setAnalyzeButton(analyzedSignature ? '파티 재분석 · 4명을 채워주세요' : '파티원을 4명 선택해주세요');
      } else if (!analyzedSignature) {
        guidance.textContent = '파티 편성이 완료되었습니다. 파티 분석을 실행하세요. 선택된 목록 초상화를 다시 누르면 편성에서 해제됩니다.';
        analyzeButton.disabled = false;
        setAnalyzeButton('파티 분석');
      } else if (stale) {
        guidance.textContent = '파티 구성이 바뀌었습니다. 파티 재분석을 실행하면 아래 결과가 새 편성으로 교체됩니다.';
        analyzeButton.disabled = false;
        setAnalyzeButton('파티 재분석');
      } else {
        guidance.textContent = '현재 편성의 분석이 완료되었습니다. 목록의 선택된 초상화를 다시 누르거나 상단 슬롯을 클릭하면 편성에서 해제됩니다.';
        analyzeButton.disabled = false;
        setAnalyzeButton('분석 완료', { complete: true });
      }
    }

    pickerCards.forEach((card) => {
      card.addEventListener('click', () => {
        const character = CHARACTER_BY_ID.get(card.dataset.characterId);
        if (!character) return;
        const selectedIndex = slots.findIndex((slot) => slot?.id === character.id);
        if (selectedIndex >= 0) {
          removeSlotAt(selectedIndex);
          renderSlots();
          showToast(`${character.name}을(를) 파티 편성에서 해제했습니다.`);
          return;
        }
        const emptyIndex = slots.findIndex((slot) => !slot);
        if (emptyIndex < 0) {
          guidance.textContent = '파티가 가득 찼습니다. 상단 초상화를 클릭해 슬롯을 비운 뒤 새 캐릭터를 선택하세요.';
          showToast('상단 파티 슬롯의 초상화를 먼저 클릭해 자리를 비워주세요.');
          document.getElementById('party-slots').classList.remove('attention');
          requestAnimationFrame(() => document.getElementById('party-slots').classList.add('attention'));
          setTimeout(() => document.getElementById('party-slots').classList.remove('attention'), 900);
          return;
        }
        slots[emptyIndex] = character;
        renderSlots();
      });
    });

    slotButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (!slots[index]) {
          showToast('아래 캐릭터 목록에서 초상화를 선택하면 이 슬롯에 배치됩니다.');
          setPickerOpen(true, true);
          return;
        }
        removeSlotAt(index);
        setPickerOpen(true);
        renderSlots();
      });
    });

    analyzeButton.addEventListener('click', () => {
      if (analyzeButton.classList.contains('analysis-complete') && currentAnalysisPayload && signature() === analyzedSignature) {
        currentAnalysisPayload.exportedAt = new Date().toISOString();
        ANALYSIS_STORE.upsert(currentAnalysisPayload);
        downloadAnalysisJson(currentAnalysisPayload);
        showToast('파티 조합과 전체 분석 내용을 JSON으로 내보냈습니다. 분석 결과 페이지에서도 확인할 수 있습니다.');
        return;
      }
      if (slots.some((slot) => !slot)) return;
      const analysis = analyzeParty(slots);
      analysisSection.innerHTML = analysisHtml(slots, analysis);
      currentAnalysisPayload = buildAnalysisExport(slots, analysis);
      analysisSection.classList.remove('analysis-collapsed');
      analysisSection.hidden = false;
      analyzedSignature = signature();
      setPickerOpen(false);
      renderSlots();
      initAnalysisToggle();
      initTooltip();
      analysisSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    pickerToggle.addEventListener('click', () => setPickerOpen(!pickerOpen));
    renderSlots();
  }

  function initPickerFilters() {
    const input = document.getElementById('party-character-search');
    const cards = [...document.querySelectorAll('.party-character-card')];
    const count = document.getElementById('party-visible-count');
    const empty = document.getElementById('party-picker-empty');
    const reset = document.getElementById('party-reset-filters');
    const buttons = [...document.querySelectorAll('.party-filter-button')];
    const selected = { element: new Set(), role: new Set() };

    function matches(value, set) {
      return set.size === 0 || set.has(value);
    }

    function apply() {
      const query = normalizeSearchText(input.value).split(' ').filter(Boolean);
      let visible = 0;
      cards.forEach((card, index) => {
        const searchMatch = query.length === 0 || query.every((term) => CHARACTER_SEARCH_INDEX[index].includes(term));
        const match = searchMatch && matches(card.dataset.element, selected.element) && matches(card.dataset.role, selected.role);
        card.hidden = !match;
        if (match) visible += 1;
      });
      count.textContent = visible;
      empty.hidden = visible !== 0;
      reset.hidden = selected.element.size === 0 && selected.role.size === 0;
    }

    input.addEventListener('input', apply);
    buttons.forEach((button) => button.addEventListener('click', () => {
      const set = selected[button.dataset.filterGroup];
      const value = button.dataset.filterValue;
      set.has(value) ? set.delete(value) : set.add(value);
      const active = set.has(value);
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
      apply();
    }));
    reset.addEventListener('click', () => {
      Object.values(selected).forEach((set) => set.clear());
      buttons.forEach((button) => {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
      });
      apply();
    });
    apply();
  }

  let tooltipInitialized = false;
  function initTooltip() {
    if (tooltipInitialized) return;
    tooltipInitialized = true;
    const tooltip = document.querySelector('.tooltip');
    let active = null;

    function place(target) {
      const rect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      left = Math.max(12, Math.min(left, window.innerWidth - tooltipRect.width - 12));
      let top = rect.top - tooltipRect.height - 10;
      if (top < 10) top = rect.bottom + 10;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }

    function show(target) {
      const keyword = GAME_KEYWORD_BY_TEXT.get(target.dataset.gameKeyword || '');
      const gameTerm = GAME_TERM_BY_ID.get(target.dataset.gameTerm || keyword?.termId || '');
      const legacy = glossary[target.dataset.term];
      if (!keyword && !gameTerm && !legacy) return;
      let category = legacy?.fullName || legacy?.category || '';
      let title = legacy?.name || '';
      let description = legacy?.description || '';
      if (gameTerm) {
        const definition = gameTerm.sections?.find((section) => section.label === '정의 및 효과 설명')?.text || gameTerm.sections?.[0]?.text || '';
        category = gameTerm.category;
        title = keyword?.title || keyword?.text || gameTerm.name;
        description = keyword?.description || definition;
      }
      active = target;
      tooltip.innerHTML = `<div class="tooltip-category">${esc(category)}</div><h3>${esc(title)}</h3><p>${esc(description).replaceAll('\n', '<br>')}</p>`;
      tooltip.classList.add('visible');
      tooltip.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => place(target));
    }

    function hide() {
      active = null;
      tooltip.classList.remove('visible');
      tooltip.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('pointerover', (event) => {
      const target = event.target.closest('.term-link');
      if (target && event.pointerType !== 'touch') show(target);
    });
    document.addEventListener('pointerout', (event) => {
      if (event.target.closest('.term-link') && event.pointerType !== 'touch') hide();
    });
    document.addEventListener('click', (event) => {
      const target = event.target.closest('.term-link');
      if (target) {
        event.preventDefault();
        active === target ? hide() : show(target);
      } else if (!event.target.closest('.tooltip')) hide();
    });
    window.addEventListener('scroll', () => active && place(active), { passive: true });
    window.addEventListener('resize', () => active && place(active));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') hide(); });
  }

  render();
})();
