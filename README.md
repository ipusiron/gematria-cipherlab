<!--
---
id: day109
slug: gematria-cipherlab

title: "Gematria CipherLab"

subtitle_ja: "ゲマトリア計算トレースツール"
subtitle_en: "Gematria Calculation Trace Tool"

description_ja: "7種類の文字数値対応を、正規化・トークン化・数値割当・合計の過程とともに確認できる学習用Webツール"
description_en: "Educational web tool for inspecting seven letter-value methods with normalization, tokenization, mapping, and summation traces"

category_ja:
  - 古典暗号
  - 数秘術
category_en:
  - Classical Cryptography
  - Numerology

difficulty: 1

tags:
  - gematria
  - agrippa-cipher
  - numerology
  - cryptography
  - static-web

repo_url: "https://github.com/ipusiron/gematria-cipherlab"
demo_url: "https://ipusiron.github.io/gematria-cipherlab/"

hub: true
---
-->

[English](README.en.md) · 日本語

# Gematria CipherLab - ゲマトリア計算トレースツール

![GitHub Repo stars](https://img.shields.io/github/stars/ipusiron/gematria-cipherlab?style=social)
![GitHub forks](https://img.shields.io/github/forks/ipusiron/gematria-cipherlab?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/ipusiron/gematria-cipherlab)
![GitHub license](https://img.shields.io/github/license/ipusiron/gematria-cipherlab)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue?logo=github)](https://ipusiron.github.io/gematria-cipherlab/)

**Day109 - 生成AIで作るセキュリティツール200**

文字へ数値を割り当てる7種類の方式を、正規化・トークン化・数値割当・合計の順に確認できる、ブラウザー完結型の学習用ツールです。Agrippaの23文字表と現代綴り向けの27枠転写を区別し、ヘブライ文字の母音記号や表示形もUnicode正規化後に扱います。

## 🌐 デモページ

👉 [Gematria CipherLabを開く](https://ipusiron.github.io/gematria-cipherlab/)

インストールは不要です。入力した文字列はブラウザー内だけで処理され、外部へ送信されません。画面は日本語と英語を切り替えられます。

## 📸 スクリーンショット

![Agrippa 27枠で正規化と計算トレースを表示した画面](assets/screenshot.png)

*Agrippa 27枠で、W→HVの置換と合計値を確認している画面*

## ✨ 特徴

- 7種類の方式を同じ画面で比較
- 入力文字、置換後トークン、値、合計を段階表示
- 計算対象・置換・除外・無視を色分け
- Hebrew Standard用オンスクリーンキーボード
- 日本語・英語の完全切替と設定保存
- 320px幅から使えるモバイルファーストUI
- 外部ライブラリー、外部API、ビルド処理なし

## 🎯 ユースケース

- ゲマトリアの「方式によって値が変わる」性質を授業や自習で確認する
- Agrippa 23と27枠転写で、I/J・U/V・HI/HVの扱いを比較する
- ヘブライ文字の通常形・語末形・母音記号を含む入力を観察する
- 同じ語をA=0、A=1、A=1の6倍で計算し、方式間の関係を調べる
- 計算過程を追い、表計算や手計算の結果を照合する

## 📖 収録方式

| 画面 | 方式 | 規則の概要 |
|---|---|---|
| 英語・ラテン文字 | English Zero-based | A=0〜Z=25 |
| 英語・ラテン文字 | English Ordinal | A=1〜Z=26 |
| 英語・ラテン文字 | English ×6 | English Ordinalの各値を6倍（A=6〜Z=156） |
| 英語・ラテン文字 | Latin 23 | 23文字を1〜23で数え、J→I、U→V、Wは除外 |
| Agrippa | Agrippa 23 | A〜I=1〜9、K〜S=10〜90、T/V/X/Y/Z=100〜500 |
| Agrippa | Agrippa 27枠 | U=200、J=600、V=700、HI=800、HV=900、W→HV |
| ヘブライ文字 | Hebrew Standard | 22文字を1〜400で計算し、語末形は通常形と同値 |

### Agrippa 23と27枠転写

Agrippa 23は原表の23文字を使います。現代綴りに含まれるJはI、UはVへ置き換え、Wは表にない文字として除外します。

Agrippa 27枠は、原表末尾の「子音のI」「子音のV」「HI」「HV」を、現代入力でそれぞれJ、V、HI、HVへ対応させる本ツールの転写設計です。Uは200、Jは600、Vは700になり、WはHV=900へ置き換えます。この設計は、原綴りにあるI/Vの母音・子音を自動判定するものではありません。

HIとHVは連続している場合だけ複合トークンです。たとえば`HI`は800ですが、`H I`は8+9=17です。

### Hebrew Standard

א〜תを標準値1〜400へ対応させます。ך・ם・ן・ף・ץは、それぞれכ・מ・נ・פ・צと同じ値です。入力はNFKDで正規化し、母音記号と朗誦記号を警告なしで無視します。そのため、`שָׁלוֹם`は`שלום`と同じ376になり、表示形`שׁ`も分解してש=300として計算します。

## 🔬 計算トレース

結果は次の3段階で表示します。

1. Tokenization: 入力を方式固有のトークンへ分け、置換・除外・無視を示す
2. Value assignment: 各計算対象トークンと数値を対応させる
3. Total: 値の加算式と合計を示す

| 状態 | 意味 |
|---|---|
| 計算対象 | 方式の表にあり、合計へ加える |
| 正規化・置換 | J→I、W→HV、Unicode正規化などを経て合計へ加える |
| 除外 | 文字ではあるが、選択した方式に定義がない |
| 無視 | 空白、句読点、数字、ヘブライ文字の母音記号・朗誦記号など |

入力は最大10,000文字です。英語・ラテン文字方式ではNFKCと大文字化、ヘブライ文字方式ではNFKDを適用します。

## ⚠️ 結果の限界

同じ合計値は、語同士の意味的関係、予言、真正性、暗号としての安全性を証明しません。結果は、選んだ方式、綴り、転写、Unicode正規化に左右されます。

このツールは文字と数値の対応を確認する計算器です。歴史的・宗教的な解釈の正しさを判定せず、暗号化、認証、改ざん検知にも使用できません。

## 🔒 セキュリティとプライバシー

- 入力はブラウザー内で処理し、保存・送信しない
- ユーザー入力の描画に`textContent`と`replaceChildren()`を使用
- `script-src 'self'`、`connect-src 'none'`などのCSPをHTMLで設定
- 計算表と計算結果を再帰的に凍結し、実行中の変更を防止
- 外部ライブラリーを読み込まない

GitHub Pagesでは、このリポジトリーから`X-Frame-Options`などのHTTPレスポンスヘッダーを設定できません。HTMLのCSPメタ要素では`frame-ancestors`も有効にならないため、公開ページの埋め込み禁止は保証していません。

## 🚀 使い方

1. 「英語・ラテン文字」「Agrippa」「ヘブライ文字」からタブを選びます。
2. 必要なら方式を選択します。
3. テキストを入力するか、プリセットを選びます。
4. 「計算」を押してトレースと参照表を確認します。

ローカルでは`index.html`を直接開けます。ローカルHTTPサーバーから配信する場合も、追加のビルドは不要です。

## 🧪 テスト

Node.js 22以降で、依存パッケージをインストールせずに実行できます。

```console
npm test
```

テストでは、7方式の代表値、Agrippaの最長一致と境界、ヘブライ文字の正規化、データの不変性、日英メッセージの対応、HTML/CSPの要件を確認します。

## 📁 ディレクトリー構造

```text
gematria-cipherlab/
├── .github/
│   └── workflows/
│       └── test.yml          # Node.js 22で自動テスト
├── assets/
│   ├── en/
│   │   └── screenshot.png    # 英語画面のスクリーンショット
│   └── screenshot.png        # 日本語画面のスクリーンショット
├── docs/
│   ├── detailed_design.md    # 計算コアとデータ処理の設計
│   └── ui_spec.md            # 画面・操作・レスポンシブ仕様
├── test/
│   ├── core.test.js          # 計算コアのテスト
│   ├── html.test.js          # HTMLとCSPのテスト
│   ├── i18n.test.js          # 日英メッセージのテスト
│   └── readme.test.js        # README同期のテスト
├── gematria-core.js          # DOMに依存しない計算コア
├── messages.js               # 日本語・英語メッセージ
├── script.js                 # 画面制御と結果描画
├── style.css                 # モバイルファーストのスタイル
├── index.html                # アプリケーション画面
├── README.md                 # 日本語版README
├── README.en.md              # 英語版README
├── CLAUDE.md                 # 開発時の規則と構成
├── package.json              # テストコマンド
└── LICENSE                   # MITライセンス
```

## 🔗 参考資料

- [Agrippa, *De occulta philosophia*, Book II, Chapter XX](https://www.alchemy-texts.com/book/three-books-of-occult-philosophy/)
- [Internet Archive: *De Occulta Philosophia*（1533年版）](https://archive.org/details/DeOccultaPhilosophiaLoc1533)
- [Jewish Encyclopedia: “Gematria”](https://www.jewishencyclopedia.com/articles/6571-gematria)
- [Unicode Names List: Hebrew](https://unicode.org/Public/18.0.0/charts/nameslist/0590/)
- [Unicode Names List: Alphabetic Presentation Forms](https://www.unicode.org/Public/UCD/latest/charts/nameslist/fb00/)

## 📄 ライセンス

MIT Licenseです。詳細は[LICENSE](LICENSE)を参照してください。

## 🛠️ このツールについて

本ツールは「生成AIで作るセキュリティツール200」プロジェクトのDay109として制作しています。プロジェクト全体と他のツールは、[生成AIで作るセキュリティツール200](https://akademeia.info/?page_id=44607)を参照してください。
