# Gematria CipherLab — 詳細設計書

## 1. 目的
Gematria CipherLab は、複数のゲマトリア方式を横断的に扱い、
**トークン化 → 数値確定 → 合計** の計算過程を可視化する教育・分析向けツールである。

## 2. 設計方針
- 計算の最小単位は **トークン（可変長）**
- トークン化規則は **方式（Scheme）に固定**
- 未定義トークンは **警告を表示し、計算から除外**
- 計算過程は常にトレース可能
- **多言語対応**（日本語・英語切替）

## 3. サポート方式（5方式）

### 3.1 Simple English A=0
- アルファベット: A–Z（26文字）
- トークン: 1文字
- A=0, B=1, ... Z=25（ゼロインデックス）

### 3.2 Simple English A=1
- アルファベット: A–Z（26文字）
- トークン: 1文字
- A=1, B=2, ... Z=26

### 3.3 Simple Latin23
- アルファベット: 23文字（I/J統合、U/V統合）
- トークン: 1文字
- J→I, U→V（正規化）
- W は未定義（警告＋除外）

### 3.4 Agrippa 23
- アルファベット: 23文字
- トークン: 1文字
- J→I, U→V（正規化）
- W は未定義（警告＋除外）
- 数値体系: 1-9（単位）, 10-90（十の位）, 100-500（百の位）

### 3.5 Agrippa 27
- アルファベット: 27トークン（単一文字 + 複合トークン）
- トークン: 1文字 + 複数文字（HI, HV）
- トークン化規則: 左から最長一致
- W → HV に変換
- J, V は独立した値（600, 700）
- HI=800, HV=900

## 4. トークン状態
| 状態 | 説明 | 表示スタイル |
|------|------|-------------|
| Included | 計算に含める | 緑系背景 |
| Excluded | 未定義のため除外 | 赤系背景 + 取消線 |
| Normalized | 正規化して含める | 黄系背景 |

## 5. 計算パイプライン
```
入力テキスト
    ↓
1. 正規化（大文字変換、空白除去）
    ↓
2. トークン化（方式別ルール適用）
    ↓
3. 数値割当（マッピングテーブル参照）
    ↓
4. 合計計算（Includedトークンのみ）
    ↓
結果表示
```

## 6. プリセット例題
- 各方式に3例（計15例）
- UIは1つのプルダウンで提供
- 選択時に入力欄を置換

| 方式 | 例題1 | 例題2 | 例題3 |
|------|-------|-------|-------|
| Simple English A=0 | HELLO | ABC | ZERO |
| Simple English A=1 | HELLO | WORLD | GEMATRIA |
| Simple Latin23 | ROMA | CAESAR | LATIN |
| Agrippa 23 | ABRACADABRA | ALPHA | OMEGA |
| Agrippa 27 | JEHOVA | IHVH | HIRAM |

## 7. 多言語対応
- 対応言語: 日本語（JA）、英語（EN）
- デフォルト: 日本語
- 切替: ヘッダーのトグルボタン
- 言語設定: localStorage に保存
- 対象要素: data-i18n 属性で指定

## 8. セキュリティ設計
### 8.1 XSS対策
- `innerHTML` 使用を最小限に抑制
- ユーザー入力は `textContent` で描画
- コンテンツクリアは `replaceChildren()` を使用

### 8.2 CSP（Content Security Policy）
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self';">
```

### 8.3 データ保護
- `Object.freeze()` でスキーマオブジェクトを凍結
- localStorage アクセスは try-catch でエラーハンドリング
- 外部API呼び出しなし、データ送信なし

## 9. 実装ファイル構成
```
gematria-cipherlab/
├── index.html      # メインHTML
├── style.css       # スタイルシート（モバイルファースト）
├── script.js       # アプリケーションロジック
├── README.md       # プロジェクト説明
└── docs/
    ├── detailed_design.md  # 本ファイル
    └── ui_spec.md          # 画面仕様書
```

## 10. 実装状況
✅ 実装完了・GitHub Pages公開準備完了
