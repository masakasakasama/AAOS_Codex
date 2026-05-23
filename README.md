# Try it AAOS

Android Automotive OS (AAOS) をアプリレイヤー中心に学ぶための公開用Web教材です。

ZIPで渡されたGlass系デザインを踏襲しつつ、内容は次の学習サイトとして再構成しています。

- Virtual IVI Simulator: VHAL / RRO / SystemUI / Media / Settings の変更を画面で体感
- Courses: 初級・中級・上級の3コース
- AOSP Assets: `packages/apps/Car/*` の標準アプリ素材量を実測表で確認
- File Map: XML / Controller / Manager / VHAL の紐づき
- Figures: 図解カードと小テスト
- Fact Check: 公式docsとAOSP sourceへのリンク

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

生成物は `docs/` に出ます。GitHub Pages の設定で Source を `master` / `/docs` にすると、スマホから公開URLで読めます。

このリポジトリではスマホ学習用に、公開用Webページである `docs/` もコミット対象にします。

## Fact Check Scope

確認日: 2026-05-24 JST

- 公式AOSP docs、Android API reference、android.googlesource.com を優先
- AOSP asset数は `packages/apps/Car/*` のHEADを浅いcloneして集計
- `res/values` には多言語 `strings.xml` が多く含まれるため、UI素材の多さは `layout` / `drawable` / `xml` も合わせて見る
- このWebサイトは教育用Simulatorであり、スマホAndroid上で本物のAAOS CarService/VHALを動かすものではありません
