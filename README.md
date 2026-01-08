<!--
---
id: day109
slug: gematria-cipherlab

title: "Gematria CipherLab"

subtitle_ja: "ゲマトリア計算トレースツール"
subtitle_en: "Gematria Calculation Trace Tool"

description_ja: "複数のゲマトリア方式に対応し、トークン化から合計計算までの過程を可視化する教育・分析向けWebツール"
description_en: "Educational web tool supporting multiple gematria schemes with step-by-step calculation visualization"

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

# Gematria CipherLab – ゲマトリア計算トレースツール

![GitHub Repo stars](https://img.shields.io/github/stars/ipusiron/gematria-cipherlab?style=social)
![GitHub forks](https://img.shields.io/github/forks/ipusiron/gematria-cipherlab?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/ipusiron/gematria-cipherlab)
![GitHub license](https://img.shields.io/github/license/ipusiron/gematria-cipherlab)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue?logo=github)](https://ipusiron.github.io/gematria-cipherlab/)

**Day109 - 生成AIで作るセキュリティツール200**

複数のゲマトリア方式を横断的に扱い、**トークン化 → 数値確定 → 合計計算** の過程を可視化する教育・分析向けのWebベース暗号・数秘ツールです。

---

## 🌐 デモページ

👉 **[https://ipusiron.github.io/gematria-cipherlab/](https://ipusiron.github.io/gematria-cipherlab/)**

ブラウザーで直接お試しいただけます。日本語・英語の切り替えに対応しています。

---

## 📸 スクリーンショット

> ![アグリッパ暗号での計算トレース表示：トークン化 → 数値割当 → 合計計算の3ステップを可視化](assets/screenshot.png)
>
> *アグリッパ暗号での計算トレース表示：トークン化 → 数値割当 → 合計計算の3ステップを可視化*

---

## ✨ 特徴

- **5方式対応**
  - Simple English A=0（A=0, B=1, ... Z=25）
  - Simple English A=1（A=1, B=2, ... Z=26）
  - Simple Latin23（I/J, U/V統合）
  - Agrippa 23（古典ラテン23文字版）
  - Agrippa 27（HI/HV拡張版）
- **トークン（可変長）を最小単位とする設計**
- **計算過程の完全可視化**
  - Step 1: Tokenization（トークン化）
  - Step 2: Mapping（数値確定）
  - Step 3: Summation（合計計算）
- **多言語対応**（日本語・英語切替）
- **教育用途を意識したUI**
  - トークン境界のハイライト
  - 参照テーブルとの相互ハイライト
  - 警告の二段構え表示
- **Webセキュリティを考慮した設計**
  - GitHub Pages 公開前提
  - DOM XSS / URL注入 / 供給網リスクへの対策

---

## 📖 対応ゲマトリア方式

### Simple Gematria

| 方式 | 説明 |
|------|------|
| **Simple English A=0** | A=0, B=1, …, Z=25（ゼロインデックス） |
| **Simple English A=1** | A=1, B=2, …, Z=26 |
| **Simple Latin23** | J→I、U→V に正規化。W は未定義（警告して除外） |

### Agrippa Cipher（アグリッパ暗号）

アグリッパ暗号は、ルネサンス期の魔術師・オカルティスト **ハインリヒ・コルネリウス・アグリッパ**（Heinrich Cornelius Agrippa von Nettesheim, 1486–1535）が著書『**隠秘哲学について（De Occulta Philosophia Libri Tres）**』で体系化した **ラテン文字のゲマトリア（数秘術的換字システム）** です。

#### 23文字版（16世紀ラテンアルファベット）

| 区分 | 文字 | 数値 |
|------|------|------|
| Units | A–I | 1–9 |
| Tens | K–S | 10–90 |
| Hundreds | T, V, X, Y, Z | 100–500 |

**エイリアス処理**: J → I（9）、U → V（200）、W → 未定義（警告して除外）

#### 27文字版（拡張版）

| 追加 | 数値 | 備考 |
|-----|------|------|
| J | 600 | 子音の I |
| V | 700 | 子音の V |
| HI | 800 | ダイグラフ |
| HV (W) | 900 | ダイグラフ |

### Agrippa 23 / 27 の違い

| 項目 | Agrippa 23 | Agrippa 27 |
|------|-----------|-----------|
| トークン | 1文字のみ | 1文字 + HI/HV |
| HI/HV | 分割される | 2文字トークン |
| W | 未定義 | HV として扱う |

同じ入力でも、方式によって **トークン化結果と合計値が変化** します。

---

## 🔬 計算過程の可視化

計算を以下の **3ステップ** で表示します。

1. **Tokenization** – トークン境界をハイライト表示
2. **Mapping** – トークンごとの数値確定
3. **Summation** – 人間に読みやすい式表示（例：`HI(800) + HV(900) = 1700`）

### トークンの状態

| 状態 | 説明 | 表示 |
|------|------|------|
| Included | 計算に含める | 緑系背景 |
| Excluded | 未定義のため除外 | 赤系背景 + 取消線 |
| Normalized | 正規化して含める | 黄系背景（例：J→I） |

---

## 🎯 プリセット例題

各方式に **プリセット例題（3種類）** を用意しています。

- **Basic** – 基本的な計算確認
- **Difference** – 方式差が出る例
- **Warning** – 未定義トークンの挙動確認

---

## 🔒 セキュリティ設計

本ツールは **静的Webツールとしての安全性** を重視しています。

- `innerHTML` の使用を最小限に抑制（`textContent` / `replaceChildren()` を使用）
- ユーザー入力は常にエスケープして描画
- CSP（Content Security Policy）を設定
- `Object.freeze()` でデータオブジェクトを凍結
- 外部送信・APIキー保持は行わない

---

## 🔗 関連リソース

- [Esoteric Archives – Agrippa](https://www.esotericarchives.com/agrippa/agripp2b.htm)
- [Internet Archive – De Occulta Philosophia（1533年版）](https://archive.org/details/DeOccultaPhilosophiaLoc1533)
- [Wikipedia – Three Books of Occult Philosophy](https://en.wikipedia.org/wiki/Three_Books_of_Occult_Philosophy)

---

## 📁 ディレクトリー構造

```
gematria-cipherlab/
├── index.html          # メインHTMLファイル
├── script.js           # アプリケーションロジック
├── style.css           # スタイルシート（モバイルファースト）
├── README.md           # 本ドキュメント
├── LICENSE             # ライセンスファイル
├── CLAUDE.md           # Claude Code用プロジェクト情報
├── assets/
│   └── screenshot.png  # スクリーンショット
└── docs/
    ├── detailed_design.md  # 詳細設計書
    └── ui_spec.md          # 画面仕様書
```

---

## 📄 ライセンス

- ソースコードのライセンスは `LICENSE` ファイルを参照してください。

---

## 🛠️ このツールについて

本ツールは、「生成AIで作るセキュリティツール200」プロジェクトの一環として開発されました。
このプロジェクトでは、AIの支援を活用しながら、セキュリティに関連するさまざまなツールを200日間にわたり制作・公開していく取り組みを行っています。

プロジェクトの詳細や他のツールについては、以下のページをご覧ください。

🔗 [https://akademeia.info/?page_id=44607](https://akademeia.info/?page_id=44607)
