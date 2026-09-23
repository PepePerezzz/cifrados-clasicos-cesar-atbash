import test from "node:test";
import assert from "node:assert/strict";
import { crearAlfabeto, segmentarGrafemas } from "../js/alphabet.js";
import { detectarYDescifrar } from "../js/analysis.js";

const charset = String.raw`⚈o¿H⒥Y▅l┹j⎁Fⓔf⇔Ñ∿m⎏z≄t³CⒽg⚘G∜y♊s⎠Ü☒Q⍆I⚦e✱O➵X❤A₸r⇛úⓕh┨q➿ü⛊u┞w⌆W♜ñ☡B①Á₴Ú£c⛻n⏼p⏴ó&K┆L⒈v₤S☺b≀P₭V⍭é≔Í₼ÓⓍa≲Z÷k↖í╘E¡M⍪T❟á∓x☶U⍵d⍠N➇É⌚J♁D┍R⒪i╡-¢☞⎦⍔➒‸⓶⛀—⛑⍓≫⚳⒉⁔➋⋈⁙⎗➜?╾≇♖⎋⛳⊑❑¹♪✍‣⒗✁╩⛨▧⍤₯⌝⏛\†Ⓞ≛➆⌺⊭┓⒨⛩|♥⌽☎‰◖⋖⋸⎵╢⊺‗✃☖╜➡↙₠◥[❢♕↞∼⌞'∦≹❨⌮⓻⇮⎔‿⋫○⛾ⓚ⊨⌊⋧∩➕⍼❫∛☗✖⁀⋒┃❅❲⎃⚿₶⎴¥✠➢➴⍿⁘⍲❏⚧ⓝ⊛⊿⍘‥⏫%\*⊂⍟ⓠ➀┉┡⁞⑯☢➪@↷☍⚛⛰⎥┳∽⊸◨❞♋⒘❁⒡▔⎾⋢₺₳⋮\`⊝♄⒫←Ⓣ※▤◈☼➶╈Ⓓ➥]⓮⒣⒝⎯¸⒖⎤‼⒒ⓨ⍏⚡✡⚺⋹➍⏟⛫◎⇻⛣┢◽ⓜ▾♱⌙⋵↛☀◳☲☄⛗⑴❬♒∏┇╉⚚⏇⎮♚⏷≩‚“▁⛁≂♷◲⓺⋾⚢₮✽┲➖═↣⚷✤⎝⍃⁑◸╃7✝⁁⛡❣➘≁₣┷◂↳ⓩ☵║⋴⇥⓽▿⌥≃ⓐ⛯⍯⚏⁂Ⓕ◓⒍♞☚⎙⛷♧☥®⑼⍸┽➧⋙⎍✫╏⎒⋃⇉↝⍽▍➬╴⓪╚⎚⒞Ⓚ`;
const alfabeto = crearAlfabeto([...new Set(segmentarGrafemas(charset))]);

const casos = [
  {
    k: 72,
    inicio: "Identifica la IP pública",
    texto: `M⋖T≫é◥S◥⛑⍤ K⍤ M❑ ⒉N⛳K◥⛑⍤ Z K⍤ ◥⒉ ⒉d◥╾⍤⋖⍤ ⋖T éR TJR◥⒉n Z ⛑nP⒉⍤déTKn ⛑nPn dTk⒉RTké⍤. (♪⍤Knd 3 ⒉R≫énk)`,
  },
  {
    k: 130,
    inicio: "Tienes a tu cargo la seguridad",
    texto: `⎴ⓠ⛨◥⛨❑ ❫ ⁙⌽ ↙❫Ⓞ╾i ⍔❫ ❑⛨╾⌽Ⓞⓠ❏❫❏ ❏⛨ ⌽◥ ⎔❫◥↙i ❏⛨❑↙Ⓞⓠ⎔⛨ ↙↞⒉i ⓠ⒉❢⍔⛨⒉⛨◥⁙❫⒉i❑ ⛨⍔ ⁙Ⓞⓠ✠◥╾⌽⍔i ❏⛨ ⍔❫ ❑⛨╾⌽Ⓞⓠ❏❫❏ ❢❫Ⓞ❫ ⛨⍔ ❫↙↙⛨❑i ❏⛨ ⍔i❑ ↙⍔ⓠ⛨◥⁙⛨❑ ❫ ⍔❫ ⎔❫◥↙❫ ⛨◥ ⍔┃◥⛨❫ (⛾❫⍔iⓄ 4 ❢⌽◥⁙i❑)`,
  },
  {
    k: 56,
    inicio: "¿ El activo más importante",
    texto: String.raw`┞ ♪ñ ╾Dó⌽‸u n⛨b ⌽niukó╾RóÍ \Í óu\╾ ukL╾R⌽p╾D⌽-R Íb ' (⒉╾ñuk 1 iáRóu)`,
  },
  {
    k: 82,
    inicio: "TEMPEST es acrónimo",
    texto: `⎵‰⋖⍤‰✁⎵ Ná ⊭➜R⛳╾❨av ↙N (⌝⊭PvR 1 ♖‸╾kv)`,
  },
  {
    k: 19,
    inicio: "Eres estudiante de seguridad",
    texto: `♁①┞ⓕ ┞ⓕ✱⏴➒⋈⍵⍭✱┞ ➒┞ ⓕ┞❤⏴①⋈➒⍵➒, ➒┞ⓕ⍵①①≄⚘⚘⍵ ⚘⍵ⓕ ⍆┞➒⋈➒⍵ⓕ ➒┞ ⓕ┞❤⏴①⋈➒⍵➒ ⛻⏴┞ ⋈⍆≔⚘┞⍆┞⍭✱⍵ⓕ✱┞ ≔⍵①⍵ ❤⍵①⍵⍭✱⋈⚦⍵① ⚘⍵ ⓕ┞❤⏴①⋈➒⍵➒ ➒┞ ✱⏴ ①┞ⓕ≔⍵⚘➒≄. ☡⚘ ⍆┞⍭≄ⓕ 3. (2 ≔⏴⍭✱≄ⓕ).`,
  },
  {
    k: 242,
    inicio: "Enumera los pasos seguidos",
    texto: `⏷⍏☼⊂⒘⋮♒ ❏✠⛰ ✡♒⛰✠⛰ ⛰⒘☢☼╃₮✠⛰ ✡♒⋮♒ ⒘⍏⒒✠⍏┉⋮♒⋮ ⒘❏ ✡♒⛰⛰╈✠⋮₮ ₮⒘❏ ⒘◲♒⊂⒘⍏ ⒒✠⋮⋮⒘⒒┉✠ ⒘⍏ ▾♒⛰⒘ ♒❏ ⒫♒⛰⒫ ✡⋮✠✡✠⋮⒒╃✠⍏♒₮✠ ✡✠⋮ ⒘❏ ₮✠⒒⒘⍏┉⒘, ₮⒘⛰⒒♒⋮☢♒⋮❏✠ ☍ ₮⒘⛰⒘⍏⒒⋮╃✡┉♒⋮.`,
  },
  {
    k: 200,
    inicio: "Los problemas de seguridad",
    texto: `⒘↙☗ ┳⁘↙₺↞⚿⎔☼☗ ⋹⚿ ☗⚿⋧%⁘⌙⋹☼⋹ ⊿%⚿ ☗⚿ ⋧⚿⛰⚿⁘☼⛰ ⚿⛰ %⛰ ☗⌙☗⛾⚿⎔☼ ₺⌙⚿⛰ ⋹⚿☗☼⁘⁘↙↞↞☼⋹↙ ┳↙⁘ ↙┳⚿⁘☼⁘ ☗↙₺⁘⚿ %⛰ ⎾.⎴. ☍⁘☼⊿%⚿☼⋹↙ ₠ ☗↙⛰ ┳⁘↙₺↞⚿⎔☼☗ ⋹⚿ ⛁  (1 ┳%⛰⛾↙).`,
  },
  {
    k: 48,
    inicio: "Estamos desarrollando una modificación",
    texto: String.raw`╾KÚ⒉BúK ✁bK⒉ÍÍúüü⒉N✁ú íN⒉ Bú✁➆W➆d⒉d➆JN bN bü K➆KÚbB⒉ ✁b NJB➆N⒉K ü⒉ dí⒉ü NúK ÉbÍB➆Ú⒉ nbNbÍ⒉Í íN ÍbÉúÍÚb ✁b W⒉üÚ⒉K ÉúÍ BbK, bKÚb ÍbÉúÍÚb ✁b☞b üübi⒉Í bü NúB☞Íb ✁bü bBÉüb⒉✁ú ó bü ✁➜⒉ bN Zíb W⒉üÚú. ⍔⒉Í⒉ bü K➆KÚbB⒉ úÍ➆n➆N⒉ü B⒉Nbu⒉BúK 4 Ú⒉☞ü⒉K bN ü⒉ á\\. 1. \⒉ÚúK ÉbÍKúN⒉übK ✁bü ╾BÉüb⒉✁ú (S✁⊭‣KbÍ, ⛨úB☞Íb, ✁➆Íbdd➆JN, Úbü⛀WúNú ÉbÍKúN⒉ü, Úbü⛀WúNú ✁b bBbÍnbNd➆⒉, dúNÚ⒉dÚú ✁b bBbÍnbNd➆⒉), 2. húÍ⒉Í➆úK (S✁⊭‣KbÍ, húÍ⒉ bNÚÍ⒉✁⒉, húÍ⒉ -⒉ü➆✁⒉) 3. Ⓞbn➆KÚÍúK ✁b ⒉K➆KÚbNd➆⒉K (S✁⊭‣KbÍ, húÍ⒉ bNÚÍ⒉✁⒉, húÍ⒉ K⒉ü➆✁⒉, Wbda⒉), 4. SNd➆✁bNd➆⒉K(S✁⊭‣KbÍ, Ú➆Éú⊭➆Nd➆✁bNd➆⒉, Wbda⒉). é Zí⛀ Ú⒉☞ü⒉K NbdbK➆Ú⒉ ÚbNbÍ ⒉ddbKú bü ✁bK⒉ÍÍúüü⒉✁úÍ É⒉Í⒉ üübi⒉Í ⒉ ☞íbN W➆N bü ✁bK⒉ÍÍúüüú ✁bü K➆KÚbB⒉. (2 ÉíNÚúK).`,
  },
];

test("detecta correctamente ocho criptogramas con charset de 430 grafemas", () => {
  assert.equal(alfabeto.modulo, 430);
  for (const [indice, caso] of casos.entries()) {
    const resultado = detectarYDescifrar(caso.texto, alfabeto);
    assert.equal(resultado.metodo, "caesar", `método del caso ${indice + 1}`);
    assert.equal(resultado.desplazamiento, caso.k, `desplazamiento del caso ${indice + 1}`);
    assert.ok(resultado.texto.startsWith(caso.inicio), `texto del caso ${indice + 1}`);
  }
});
