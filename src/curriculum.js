const lessonMinutes = {
  p1: 5, p2: 7, p3: 6, p3b: 5, p4: 7, p5: 6, p6: 7, p7: 6,
  b1: 7, b2: 6, b3: 7, b4: 7, b5: 8, b6: 8, b7: 7, b8: 7, b9: 7, b10: 8,
  i1: 10, i2: 9, i3: 10, i4: 8, i5: 10, i6: 9, i7: 7, i8: 8,
  i9: 9, i10: 9, i11: 7, i12: 9, i13: 9, i14: 9, i15: 7, i16: 10,
  a1: 11, a2: 12, a3: 11, a4: 10, a5: 9, a6: 8, a7: 9, a8: 10, a9: 9, a10: 12,
};

const lesson = (id, title, minutes, summary, points, extra = {}) => ({
  id,
  title,
  minutes: lessonMinutes[id] ?? minutes,
  summary,
  points,
  ...extra,
});

export const officialVisuals = {
  mobileStatus: {
    file: "mobile-status-bar.png",
    alt: "Android smartphone status bar region highlighted in Android Developers guidance",
    title: "Official: Android smartphoneのStatus bar",
    source: "https://developer.android.com/design/ui/mobile/guides/foundations/system-bars",
    sourceLabel: "Android Developers: Android system bars / Figure 2",
    versionNote: "現行Mobile guidanceはAndroid 15のedge-to-edge挙動も説明している。ここではAppとSystem UIの境界を読む。",
    markers: [
      { x: 50, y: 26, label: "Status bar / System UI", note: "時刻、notification、batteryなど。アプリが自由に所有するcontentではない。" },
      { x: 49, y: 72, label: "App content", note: "Toolbarや本文はアプリ側。layout/resource/codeの変更対象になる。" },
    ],
  },
  mobileNavigation: {
    file: "mobile-navigation-bar.png",
    alt: "Android smartphone gesture navigation handle shown in Android Developers guidance",
    title: "Official: Android smartphoneのNavigation bar",
    source: "https://developer.android.com/design/ui/mobile/guides/foundations/system-bars",
    sourceLabel: "Android Developers: Android system bars / Figure 7",
    versionNote: "スマホではgesture handleなどがApp外のnavigation affordanceになる。AAOSではbar配置や常設vehicle controlsがさらに異なる。",
    markers: [
      { x: 26, y: 78, label: "Gesture handle", note: "ユーザーがsystem navigationへ戻る領域。contentを隠さないようInsetsを扱う。" },
      { x: 77, y: 75, label: "Adaptive navigation", note: "画面幅に応じてApp navigationが変わる例。System barとは区別する。" },
    ],
  },
  aaosHome: {
    file: "android-automotive-os.png",
    alt: "Android Automotive OS emulator home screen shown in Android Developers documentation",
    title: "Official: Android Automotive OS emulator Home screen",
    source: "https://developer.android.com/training/cars/platforms/automotive-os",
    sourceLabel: "Android Developers: Android Automotive OS overview / Figure 1",
    versionNote: "現行Android Developers掲載のOfficial画像。画像内のAndroid versionは公式本文で明示されていないため、versionは断定しない。",
    markers: [
      { x: 49, y: 6, label: "Status area", note: "時刻やdriver profileがあるsystem領域。アプリ本文とは分けて読む。" },
      { x: 17, y: 28, label: "Assistant / card surface", note: "Home上に見えるカード。Launcherや提供serviceとの関係を調べる入口。" },
      { x: 67, y: 33, label: "Navigation surface", note: "地図アプリが描く主要content領域。SystemUIやHVAC stripとはownershipが異なる。" },
      { x: 49, y: 94, label: "App entry / system controls", note: "app gridや車載向け常設操作へ到達するbottom領域。" },
      { x: 13, y: 94, label: "Climate control", note: "温度表示のような車両操作はVehicle property学習と直結する。" },
    ],
  },
  blockedActivity: {
    file: "activity-blocking-activity.png",
    alt: "An Android Automotive OS app blocked while driving as shown in Android Developers documentation",
    title: "Official: UX Restrictionsによるactivity block",
    source: "https://developer.android.com/training/cars/platforms/automotive-os",
    sourceLabel: "Android Developers: Android Automotive OS overview / Figure 2",
    versionNote: "現行Android Developers掲載のOfficial画像。画面例はUX Restrictionsの挙動確認に限定して使う。",
    markers: [
      { x: 50, y: 40, label: "Blocked content", note: "Driving Optimizedでないactivityを走行中にsystemが覆う表示。" },
      { x: 48, y: 6, label: "System status remains", note: "制限中でもsystem領域は残り、アプリ画面だけの判断ではない。" },
      { x: 14, y: 94, label: "Vehicle controls remain", note: "climateなど必要な常設操作を確保する考え方が見える。" },
    ],
  },
  settingsComponents: {
    file: "car-settings-components.png",
    alt: "AOSP Car Settings components architecture diagram",
    title: "Official: Car Settings component linkage",
    source: "https://source.android.com/docs/automotive/hmi/car_settings",
    sourceLabel: "AOSP: Car Settings overview / Figure 1",
    presentation: "diagram",
    versionNote: "これはUIの世代を示すscreenではなく、AOSP公式のcomponent linkage diagram。",
    markers: [
      { x: 17, y: 25, label: "SettingsFragment", note: "screenがどのXMLを使うかを返す入口。" },
      { x: 48, y: 52, label: "res/xml", note: "Preferenceとsettings:controllerを宣言するresource。" },
      { x: 18, y: 88, label: "PreferenceController", note: "Manager/API呼び出しなどのbusiness logicを置く。" },
      { x: 80, y: 88, label: "Preference", note: "ユーザーに見える設定項目。" },
    ],
  },
};

export const curriculum = [
  {
    id: "foundation",
    label: "前提",
    title: "Android未経験から入る",
    duration: "約 50 分 / 8 lessons",
    goal:
      "プログラミングやAndroidを知らなくても、画面、file、code、APIという言葉を見失わずにAAOSの入口へ立てるようにする。",
    modules: [
      {
        title: "00. まず迷子にならない",
        lessons: [
          lesson(
            "p1",
            "アプリ、OS、画面の違い",
            12,
            "まず見慣れたAndroid smartphoneで、Appが描く領域とSystem UIの領域を分けて見る。",
            [
              "OSはアプリを動かし、permissionや画面切替を管理する土台。",
              "アプリは特定の目的の画面と処理を持つ。設定、音楽、地図は別のアプリになり得る。",
              "車ではアプリの周囲にsystem barやclimate操作のような常設領域がある。",
            ],
            { official: officialVisuals.mobileStatus, terms: ["OS", "App", "System UI", "Status bar"] }
          ),
          lesson(
            "p2",
            "file と folder: 何を編集すると何が変わるか",
            14,
            "コード学習は『どのfileを触ると画面のどこが変わるか』を結び付ける作業。",
            [
              "`res/layout` は画面の部品配置、`res/values` は色や文言などのresourceを持つ。",
              "`AndroidManifest.xml` はアプリの存在、入口、必要なpermissionを宣言する。",
              "`src/.../*.kt` は値を読み、押された時に何をするかという動作を書く。",
            ],
            {
              figure: "files",
              files: [
                ["res/layout/screen.xml", "見える配置", "buttonやtextの並び"],
                ["res/values/colors.xml", "見える見た目", "色を一箇所で管理"],
                ["MainActivity.kt", "操作時の動作", "値を読み画面へ渡す"],
              ],
            }
          ),
        ],
      },
      {
        title: "01. Androidアプリの最小語彙",
        lessons: [
          lesson(
            "p3",
            "画面を1枚作る: Activity と resource",
            17,
            "最初は画面の入口と、文字や色の置き場所だけに絞る。Serviceや車両APIはまだ扱わない。",
            [
              "`Activity` はユーザーに見えるscreenを表示する入口。",
              "`resource` は文字、色、余白、画像など見た目の材料。",
              "例ではスマホの設定画面のタイトル色を変え、どのfileが表示に効くかだけ確認する。",
            ],
            { terms: ["Activity", "resource", "res/layout", "res/values"] }
          ),
          lesson(
            "p3b",
            "スマホのNavigationとAAOSの常設bar",
            12,
            "スマホのgesture navigationを起点に、車でbarやclimate操作が常時残る意味を比較する。",
            [
              "スマホではgesture handleやnavigation barがApp contentの外側にある。",
              "AAOSではOEMがsystem bar配置を変えたり、climate controlを常時アクセス可能にすることがある。",
              "Appを作る時はSystem UIと重ならないlayout、車載側ではdriver distractionも考える。",
            ],
            { official: officialVisuals.mobileNavigation, terms: ["Navigation bar", "WindowInsets", "CarSystemUI"] }
          ),
          lesson(
            "p4",
            "ボタンを押すと変わる: Kotlinの最小形",
            16,
            "画面に出す値を持ち、ボタンを押した時に文字を更新するcodeだけ読む。",
            [
              "`val` は値に名前を付ける。`fun` は処理のまとまり。",
              "最初の例は『+ ボタンで設定温度の表示が22.0Cから22.5Cになる』。",
              "外から値が届く `callback` は初級のproperty例で初めて接続する。",
            ],
            {
              code: `val temperature = 22.0f

fun showTemperature(value: Float) {
    temperatureText.text = "$value C"
}

showTemperature(22.5f) // + buttonを押した後の表示`,
            }
          ),
          lesson(
            "p5",
            "permission: カメラを使う許可",
            14,
            "まずスマホのカメラ例で『使う前に許可が必要な機能がある』ことを掴む。",
            [
              "写真を撮る画面を作っても、camera permissionなしではcameraを開けない。",
              "`AndroidManifest.xml` に必要なpermissionを書く例から始める。",
              "車両制御のより強いpermissionやPrivilegedは中級で、必要になった時に扱う。",
            ],
            { terms: ["permission", "AndroidManifest.xml"] }
          ),
        ],
      },
      {
        title: "02. AAOSへ渡る橋",
        lessons: [
          lesson(
            "p6",
            "Build / APK / Emulator / ADB",
            15,
            "書いた内容が画面に現れるまでの流れを先に知ると、後の実験が単なる呪文にならない。",
            [
              "sourceとresourceをbuildすると、実行可能なAPKやsystem imageになる。",
              "EmulatorはPC上で動く仮想の車載Android。",
              "ADBはPCからemulatorへ接続してinstallや状態確認を行う道具。",
            ],
            { figure: "terminal", terms: ["APK", "Emulator", "ADB"] }
          ),
          lesson(
            "p7",
            "Android Auto と AAOS: ここから本編へ",
            17,
            "Android Autoはphone projection、AAOSは車両側のAndroid。この区別を持って初級へ進む。",
            [
              "Phone上のアプリ画面を車へ投影する経路と、車側にアプリをinstallする経路は別。",
              "AAOSではCar API、Car Service、Vehicle propertyが学習対象に入ってくる。",
              "次の初級ではOfficial画面の各領域を見て、誰が描いて何と繋がるかを読む。",
            ],
            {
              figure: "boundary",
              terms: ["Android Auto", "AAOS", "IVI"],
              quiz: {
                q: "車両側へアプリをinstallし、車両向けAPIを扱う対象は？",
                answer: "AAOS",
                explanation: "Android Autoはphone projection、AAOSは車内で動くAndroid OS。",
              },
            }
          ),
        ],
      },
    ],
  },
  {
    id: "beginner",
    label: "初級",
    title: "AAOSを画面から理解する",
    duration: "約 75 分 / 10 lessons",
    goal:
      "まずIVIの画面と操作を見て、値や見た目の変化を説明する。必要になった段階でproperty、CarPropertyManager、VHALへ順番に進む。",
    modules: [
      {
        title: "01. 車載Androidの入口",
        lessons: [
          lesson(
            "b1",
            "Official AAOS画面: どの領域を誰が持つか",
            14,
            "Android Developersが掲載するAAOS emulator画面を読み、アプリのcontentと車載systemの常設領域を見分ける。",
            [
              "地図やmedia cardのようなcontentと、status/control stripのようなsystem領域を切り分ける。",
              "climate表示はVehicle propertyへ繋がる具体的な観察ポイントになる。",
              "本サイトは挙動を学ぶSimulatorであり、画像は公式docsに公開されたemulator例。",
            ],
            {
              official: officialVisuals.aaosHome,
              terms: ["AAOS", "System UI", "HVAC", "Launcher"],
              quiz: {
                q: "温度操作のように、Vehicle propertyの理解へ直結する領域は？",
                answer: "Climate control / HVAC",
                explanation: "表示値や設定値をCarPropertyManagerとVHALまで追える代表例。",
              },
            }
          ),
          lesson(
            "b2",
            "IVIの領域: Navigation / Media / Cluster / HVAC",
            16,
            "まず画面に見えている4領域を区別し、それぞれで起きる変化をSimulatorで確かめる。",
            [
              "Navigationは経路案内、Mediaは再生、Clusterはspeed/gear、HVACは空調操作を見せる。",
              "例: gearをRにするとNavigation領域がRear camera表示へ切り替わる。",
              "この時点では内部名を暗記せず、『操作に対しどの領域が変わるか』に集中する。",
            ],
            {
              terms: ["IVI", "Navigation", "Media", "Cluster", "HVAC"],
              tryId: "gear-reverse",
            }
          ),
          lesson(
            "b3",
            "値の名前を付ける: temperature / speed / gear",
            17,
            "画面で観察した温度・速度・gearを、車載Androidが扱う値 `property` として呼ぶ。",
            [
              "例: driver温度表示の元になる値を `HVAC_TEMPERATURE_SET` として扱う。",
              "propertyには『読み取りだけか』『設定できるか』『座席ごとか』という設定がある。",
              "どの値が使えるかは、後でVHAL側のproperty定義とconfigで確認する。",
            ],
            {
              files: [
                ["HVAC_TEMPERATURE_SET", "driver temperature", "22.0C -> 26.0Cの表示変化"],
                ["GEAR_SELECTION", "Rear camera表示", "P -> Rで切替"],
                ["property config", "supported / area / min-max", "実装で使える値か確認"],
              ],
            }
          ),
        ],
      },
      {
        title: "02. 画面とコードをつなぐ",
        lessons: [
          lesson(
            "b4",
            "基本アプリ: Launcher / SystemUI / Settings / Media",
            18,
            "IVIの画面を見たら、まず『どの標準アプリの所有物か』を判別する。",
            [
              "HomeとApp gridはLauncher、barや常時表示領域はSystemUI。",
              "設定項目はCar Settings、再生browse UIはMediaが中心。",
              "HVACとRadioはVehicle/API接続を直感的に追うための良い題材。",
            ],
            {
              official: officialVisuals.aaosHome,
              tryId: "media-source",
              terms: ["Launcher", "CarSystemUI", "Car Settings", "Media"],
            }
          ),
          lesson(
            "b5",
            "CarPropertyManager: propertyを読むcodeの入口",
            18,
            "b3で名前を付けたpropertyを、アプリのcodeがどう取得するかをここで初めて読む。",
            [
              "`CarPropertyManager` はpropertyをread / write / SubscribeするためのAndroid側の窓口。",
              "例: 温度設定ボタンを押したら `HVAC_TEMPERATURE_SET` をwriteする。",
              "codeを書いても、permissionや対象propertyのsupport設定がなければ動かない。",
            ],
            {
              code: `val car = Car.createCar(context)
val manager = car.getCarManager(Car.PROPERTY_SERVICE)
        as CarPropertyManager

// 終了時
car.disconnect()`,
              files: [
                ["Car.createCar(...)", "car-lib/src/android/car/Car.java", "Car Service接続の入口"],
                ["Car.PROPERTY_SERVICE", "CarPropertyManager", "property access用Manager"],
              ],
            }
          ),
          lesson(
            "b6",
            "XML resource と RRO の土台",
            17,
            "色やdimensionをコードに直書きせずresourceに置くと、OEMがRROで差し替え可能になる。",
            [
              "RROはresource resolutionを変更し、アプリのbehaviorそのものを作り替える仕組みではない。",
              "`overlayable.xml` とtarget packageの関係を先に覚える。",
              "ブランド色、アイコン、寸法はRRO向き。処理変更は別の設計判断。",
            ],
            {
              figure: "files",
              code: `<!-- base app: res/values/colors.xml -->
<color name="car_ui_color_accent">#3B82F6</color>

<!-- overlay APK: same resource name -->
<color name="car_ui_color_accent">#FF7A1A</color>`,
              tryId: "rro-accent",
            }
          ),
        ],
      },
      {
        title: "03. 安全と標準asset",
        lessons: [
          lesson(
            "b7",
            "UX Restrictions: 走行中に止めるinteraction",
            14,
            "運転中は何でも隠すのではなく、distractionになる操作を制限し、Driving Optimizedな操作を残す。",
            [
              "文字入力、複雑なsetup、長いbrowseはrestriction対象になりやすい。",
              "Play/Pauseなど許容される操作と混同しない。",
              "アプリはrestriction stateをSubscribeしてUIを更新する。",
            ],
            { official: officialVisuals.blockedActivity, tryId: "ux-driving", terms: ["DO", "UX Restrictions"] }
          ),
          lesson(
            "b8",
            "AOSP標準assetを先に読む",
            16,
            "ゼロからUIを作る前に、AOSPが提供する参照アプリとresource量を見る。",
            [
              "初手はLauncher / Settings / SystemUI。標準assetとfile linkageが豊富。",
              "Media / Dialer / HVAC / Radioは機能ごとの理解に適したサイズ。",
              "このサイトのAOSP Assets表は公開sourceのHEADからres数を実測している。",
            ],
            { terms: ["AOSP assets", "RRO", "Reuse"] }
          ),
          lesson(
            "b9",
            "EmulatorとADBで実物へ橋渡し",
            12,
            "Simulatorで概念を掴んだ後、Automotive emulatorで本物の画面・service・commandを確認する。",
            [
              "Android StudioのAutomotive system imageが実機なしの入口。",
              "Official screen画像のOS versionが明示されない場合、対象API levelのAutomotive emulatorでappearanceとbehaviorを確認する。",
              "`cmd car_service` のcommand構文はバージョン差があるため、対象buildのhelpで確認する。",
              "SimulatorのCode Bridgeは『何を検証すべきか』のガイドとして使う。",
            ],
            { tryId: "vhal-hvac-temp" }
          ),
          lesson(
            "b10",
            "メーカー例: Polestar 3から見るAAOS",
            18,
            "Polestar 3は公式にAndroid Automotive OSとGoogle built-inを案内している。公開されたinterfaceを見ながら、OEM UIとplatformの境界を考える題材にする。",
            [
              "Google built-in採用と、OEMが作るinterface/brand experienceは別の話。",
              "色・icon・resource差はRRO向き、車両feature差はproperty/config側へ整理する。",
              "メーカー事例は『AOSP標準をそのまま使う』と断言せず、差分の置き場を考える教材にする。",
            ],
            { tryId: "rro-accent", terms: ["Google built-in", "OEM UI"] }
          ),
        ],
      },
    ],
  },
  {
    id: "intermediate",
    label: "中級",
    title: "App layerからServiceへ辿る",
    duration: "約 140 分 / 16 lessons",
    goal:
      "初級で触れたCarPropertyManagerを実装として読み、標準アプリのXML、permission、RRO、audio、displayまで判断できるようにする。",
    modules: [
      {
        title: "01. Property実装",
        lessons: [
          lesson("i1", "CarPropertyManager: read / write / Subscribe", 18, "値の取得・設定・Subscribeを使い分ける。連続値はSubscribeで受ける。", [
            "`get*Property` は単発read、`set*Property` はwrite。",
            "新規コードでは `subscribePropertyEvents` / `unsubscribePropertyEvents` を中心に確認する。",
            "callbackで受ける `CarPropertyValue` はstatusとtimestampも見る。",
          ], { figure: "pipe", code: `manager.subscribePropertyEvents(
    VehiclePropertyIds.PERF_VEHICLE_SPEED,
    CarPropertyManager.SENSOR_RATE_UI,
    callback
)`, tryId: "vhal-hvac-temp" }),
          lesson("i2", "property anatomy: id / area / access / changeMode", 16, "propertyは名前だけでなくarea、access、change modeをセットで読む。", [
            "GLOBAL propertyのareaIdとSEAT/ZONE propertyを分ける。",
            "READ / WRITE / READ_WRITEにより許される操作が異なる。",
            "STATIC / ON_CHANGE / CONTINUOUSでSubscribe方法やUI更新頻度が変わる。",
          ], { figure: "seats", tryId: "vhal-fan-speed" }),
          lesson("i3", "HVAC: seat area と permission", 17, "HVACはseatごとに値を持つwrite可能propertyとpermissionの典型例。", [
            "`HVAC_TEMPERATURE_SET` と `HVAC_FAN_SPEED` のarea/configを読む。",
            "書込みpermissionがないappからの操作は許可されない。",
            "supported valueとmin/maxをconfigからUIに反映する。",
          ], { figure: "seats", tryId: "vhal-hvac-temp" }),
        ],
      },
      {
        title: "02. OEM作法とSecurity",
        lessons: [
          lesson("i4", "UX Restrictions と Driving Optimized UI", 14, "走行stateを見て、許可する操作と止める操作を設計する。", [
            "restrictionはUI設計要件であり、後付けのalertではない。",
            "Settingsやsearchのようなinteractionほど早く確認する。",
          ], { figure: "state", tryId: "ux-driving" }),
          lesson("i5", "RRO: target / overlayable / resource", 18, "base APKに対し、overlay APKが許可されたresourceを上書きする。", [
            "targetPackageとtargetNameを間違えると何も変わらない。",
            "RROで済む変更か、source/pluginが必要な変更かを切り分ける。",
          ], { figure: "files", tryId: "rro-accent" }),
          lesson("i6", "Privileged permission / allowlist / signature", 15, "制御系Car APIは通常APKでは触れない場合があり、配備方式とpermissionが設計に入る。", [
            "manifest declarationだけで十分とは限らない。",
            "Privileged app allowlistやplatform signingの必要性を対象APIごとに確認する。",
          ], { figure: "gate", tryId: "priv-permission" }),
          lesson("i7", "lifecycle と callback解除", 12, "画面が見えていない間もSubscribeを残さない。thread境界も意識する。", [
            "登録と解除を対で設計する。",
            "UI更新は適切なthread/state管理へ渡す。",
          ], { figure: "binder" }),
        ],
      },
      {
        title: "03. 標準アプリを読む",
        lessons: [
          lesson("i8", "CarSystemUI: bar / notification / overlay", 14, "アプリ外の常時表示領域を所有し、display全体の骨格を作る。", [
            "left/bottom/right system barの配置とresourceを確認する。",
            "寸法やicon変更はoverlay候補、window behavior変更はsource領域。",
          ], { figure: "layers", tryId: "systemui-bars" }),
          lesson("i9", "Car Settings: Preference XML + Controller", 14, "設定画面は静的XMLとbusiness logic controllerを行き来して読む。", [
            "`res/xml` のPreferenceから `settings:controller` を追う。",
            "車両値が必要な設定なら、Controller側でCarPropertyManager呼び出しを探す。",
          ], { official: officialVisuals.settingsComponents, tryId: "settings-controller" }),
          lesson("i10", "Media: MediaBrowserServiceとtemplate", 15, "media source appと車向け共通UIを分離して理解する。", [
            "source発見はMediaBrowserServiceのservice宣言が入口。",
            "Media/Launcherの関係をActivityだけで追わない。",
          ], { figure: "media", tryId: "media-source" }),
          lesson("i11", "Launcher: Home / App grid / Recents", 12, "ユーザー導線の起点で、OEM差別化が大きいapp。", [
            "cardとapp gridのresourceを読む。",
            "Media source起動やrecentsとの接点を把握する。",
          ], { figure: "grid", tryId: "media-source" }),
          lesson("i12", "Dialer / HVAC / Radio / Cluster", 16, "機能別appを比べ、standard reuseとvehicle依存の強さを見分ける。", [
            "Dialerはphone連携、HVACはproperty、RadioはHAL/audio、Clusterは表示要件が中心。",
            "同じRRO戦略が全appに同程度で適するとは限らない。",
          ], { figure: "grid", tryId: "gear-reverse" }),
        ],
      },
      {
        title: "04. Cabin全体",
        lessons: [
          lesson("i13", "Car Audio: usage / zone / ducking", 15, "navigation guidance中にMedia音量を下げる理由をaudio routingで理解する。", [
            "AudioAttributes usageとCarAudioContextを結びつける。",
            "zoneやbus mappingは車種configに依存する。",
          ], { figure: "audio", tryId: "audio-duck" }),
          lesson("i14", "Multi-user / Occupant zone / Display", 15, "運転席・助手席・後席が別user/別displayとなる構成に備える。", [
            "user、occupant zone、displayのmappingを混同しない。",
            "1画面1user前提の実装を避ける。",
          ], { figure: "displays", tryId: "multi-user" }),
          lesson("i15", "Night mode / theme / display state", 12, "Vehicle stateによるtheme変更をresource設計と一緒に見る。", [
            "NIGHT_MODE eventとnight resourceの関係を確認する。",
            "RRO theme差とruntime state差を区別する。",
          ], { figure: "state", tryId: "night-mode" }),
          lesson("i16", "中級演習: App変更をどの層に置くか", 16, "要望をApp、RRO、SystemUI、Service、VHALのどこに置くか分類する。", [
            "色変更はRRO、seat温度はproperty、bar配置はSystemUI resourceから検討。",
            "変更点に応じた確認対象fileとtestを列挙できれば中級完了。",
          ], { figure: "pyramid", tryId: "rro-accent" }),
        ],
      },
    ],
  },
  {
    id: "advanced",
    label: "上級",
    title: "AOSP integrationを判断する",
    duration: "約 105 分 / 10 lessons",
    goal:
      "AOSP標準assetの利用を前提に、Service/VHAL/build/validationまで含むOEM設計レビューができるようにする。",
    modules: [
      {
        title: "01. Platform内部",
        lessons: [
          lesson("a1", "Car Service内部: BinderからHAL dispatchへ", 18, "Managerの先にあるservice側でpermission、Subscribe、HAL接続を追う。", [
            "client APIとservice実装を同一ファイル群だと思わない。",
            "`CarPropertyService` とHAL bridgeの責務を分けて読む。",
          ], { figure: "stack" }),
          lesson("a2", "AIDL VHALとvendor property", 20, "Android 13以降のVHALはAIDLが中心。OEM固有propertyの定義とconfigを設計する。", [
            "標準propertyとvendor extensionを衝突させない。",
            "support、area、access、change modeをproperty定義とconfigに明示する。",
          ], { figure: "pipe" }),
          lesson("a3", "Property追加のend-to-end trace", 17, "HVAC setを例に、AppからECU/Emulatorとcallback帰還まで説明する。", [
            "permission checkとvalue validationを抜かさない。",
            "UI反映はchange eventのSubscribe側へ帰る経路で確認する。",
          ], { figure: "pipe", tryId: "vhal-hvac-temp" }),
        ],
      },
      {
        title: "02. Buildと運用",
        lessons: [
          lesson("a4", "AOSP build / product packages / RRO同梱", 17, "appやoverlayをsystem imageへ組み込むproduct configurationを読む。", [
            "学習はprebuilt emulatorで始め、platform改修が必要になったらAOSP buildへ進む。",
            "公開sourceを取得する際の推奨manifest/branchは公式手順を都度確認する。",
          ], { figure: "package" }),
          lesson("a5", "Power management と Garage Mode", 16, "車両の電源状態と、ユーザー不在でmaintenanceするGarage Modeを学ぶ。", [
            "スマホの常時稼働前提と同じ設計にしない。",
            "更新や重い処理はpower policyとの整合を見る。",
          ], { figure: "timeline" }),
          lesson("a6", "ADB / emulator検証フロー", 14, "Simulatorで想定したpropertyやresource変更をemulator上で再現・観察する。", [
            "`cmd car_service` の利用可否とsyntaxは対象buildで確認する。",
            "`dumpsys car_service` と画面変化をセットで記録する。",
          ], { figure: "terminal", tryId: "gear-reverse" }),
        ],
      },
      {
        title: "03. 製品判断",
        lessons: [
          lesson("a7", "CTS / VTS / compatibilityの入口", 16, "機能が動くことと、platform互換性・vendor interfaceが成立することを分ける。", [
            "framework/app変更とHAL変更では検証範囲が異なる。",
            "正式な認証要件は対象productとGoogleサービス構成に応じて確認する。",
          ], { figure: "gate" }),
          lesson("a8", "1 platform / N vehicle variants", 17, "車種差をresource、config、property support、audio mappingへ整理する。", [
            "fork乱立より、変更の置き場を安定させることが保守性に効く。",
            "OEM事例は設計原則のヒントとして扱い、内部実装を推測で断定しない。",
          ], { figure: "oem", tryId: "rro-accent" }),
          lesson("a9", "Unbundled apps と prebuilt integration", 16, "MediaやDialerなど、platform treeと配布形態が変わるappの統合を読む。", [
            "Android 13以降のunbundled apps integration docsを入口にする。",
            "source treeに見えないから機能が無い、と判断しない。",
          ], { figure: "package" }),
          lesson("a10", "最終演習: 変更要求のdesign review", 19, "『ブランド色変更』『後席audio』『新property』『走行中検索制限』を層とfileへ割り当てる。", [
            "AOSP default / overlay / app extension / platform change / VHAL changeを比較する。",
            "根拠となるofficial docs、source path、検証方法まで提示できれば修了。",
          ], { figure: "pyramid", tryId: "ux-driving" }),
        ],
      },
    ],
  },
];

export const lessonExamples = {
  p1: {
    title: "スマホの時計領域と設定アプリを見分ける",
    context: "スマホ画面の上端はOS側、本文はApp側という最初の見分け方。",
    action: "Settingsアプリを開く。",
    visible: "本文は切り替わるが、上端の時刻・battery領域は残る。",
    trace: "Official画像のStatus barとApp contentの注釈を見る。",
  },
  p2: {
    title: "タイトル色だけを青から橙へ変える",
    context: "見た目の変更と動作変更をfile単位で分ける例。",
    action: "`colors.xml` のtitle colorを変更する。",
    visible: "画面のタイトル色だけが変わり、押した時の動作は同じ。",
    trace: "`res/values/colors.xml` と参照するlayout。",
  },
  p3: {
    title: "温度設定の小さな画面を表示する",
    context: "最初に覚えるのは画面の入口と見た目の材料だけ。",
    action: "Temperature Activityを起動する。",
    visible: "`22.0 C` と `+` buttonが表示される。",
    trace: "`Activity` と `res/layout` / `res/values`。",
  },
  p3b: {
    title: "下端の操作領域を比べる",
    context: "スマホのgesture handleと車の常設HVAC barは用途が異なる。",
    action: "スマホ画像とOfficial IVI画像の下端を見る。",
    visible: "スマホはnavigation、車は温度操作などが常時見える。",
    trace: "`System UI` / `CarSystemUI` が持つ領域。",
  },
  p4: {
    title: "温度の + buttonを押す",
    context: "Kotlinを、画面変化が発生する最小例で読む。",
    action: "`+` を押して `showTemperature(22.5f)` を実行する。",
    visible: "表示が `22.0 C` から `22.5 C` へ変わる。",
    trace: "`MainActivity.kt` のclick処理と表示更新関数。",
  },
  p5: {
    title: "カメラを初めて開く",
    context: "permissionは車の話に入る前にスマホで理解できる。",
    action: "cameraを使う画面を開く。",
    visible: "許可dialogが出て、拒否するとpreviewが出ない。",
    trace: "`AndroidManifest.xml` のcamera permission。",
  },
  p6: {
    title: "編集したアプリをemulatorで見る",
    context: "file変更が画面になるまでの工程を一往復する。",
    action: "buildしてAPKをemulatorへinstallする。",
    visible: "編集したタイトル色や温度画面がemulatorに現れる。",
    trace: "Gradle build、APK、ADB installの順。",
  },
  p7: {
    title: "Google Mapsを投影するか、車にinstallするか",
    context: "Android AutoとAAOSを混同しないための比較。",
    action: "Phone接続の投影と車載Home上のアプリ起動を比べる。",
    visible: "投影はPhone由来、AAOSは車載OS上で画面が動く。",
    trace: "Android Auto / AAOS / IVI の役割差。",
  },
  b1: {
    title: "Official Home画面の温度領域を見つける",
    context: "実画面から、車両値に関係しそうな領域を探す。",
    action: "Official IVI画像の下端温度表示を見る。",
    visible: "左右の温度操作がHome上に常設されている。",
    trace: "HVAC表示から後続のtemperature propertyへ進む。",
  },
  b2: {
    title: "PからRへ切り替えてRear cameraを出す",
    context: "内部用語より先に、操作と変化の関係を体で掴む。",
    action: "Simulatorで `GEAR_SELECTION = REVERSE` をApply。",
    visible: "Navigation領域がRear camera surfaceへ切り替わる。",
    trace: "変わった領域はCluster/Navigation、値の名前は次lessonで扱う。",
  },
  b3: {
    title: "driver温度を22.0Cから26.0Cへ変える",
    context: "画面に出る値へ `property` という名前を与える。",
    action: "`HVAC_TEMPERATURE_SET` を26.0にする。",
    visible: "HVAC stripのDRIVER表示が26.0Cになる。",
    trace: "property名、seat area、supported min/max config。",
  },
  b4: {
    title: "Home画面の領域から標準appを推定する",
    context: "ownerを当ててからsourceを読むための練習。",
    action: "Official IVIで地図、bar、media cardを指差す。",
    visible: "Home/Media/System領域が同じ画面内に共存する。",
    trace: "Launcher、CarSystemUI、MediaのAOSP source候補。",
  },
  b5: {
    title: "温度設定をcodeからwriteする",
    context: "propertyを知った後で、初めてcodeの窓口を導入する。",
    action: "温度buttonから `CarPropertyManager` に設定値を渡す。",
    visible: "設定されたtemperatureがHVAC表示に反映される。",
    trace: "`Car.createCar` と `CarPropertyManager`。",
  },
  b6: {
    title: "ブランド色を橙へ差し替える",
    context: "処理を変えずに見た目だけOEM差分にする例。",
    action: "Simulatorでaccent colorのRRO scenarioをApply。",
    visible: "buttonや強調色が一括で変わる。",
    trace: "`res/values`、`overlayable.xml`、overlay APK。",
  },
  b7: {
    title: "走行中に長い設定操作を止める",
    context: "安全制限は実際に止まる画面で読む。",
    action: "Simulatorで走行中scenarioをApply。",
    visible: "操作を制限する表示になり、必要な車両controlsは残る。",
    trace: "UX Restrictions stateとDriving Optimized対応。",
  },
  b8: {
    title: "Homeの見た目変更をどのrepoから始めるか",
    context: "ゼロ実装よりAOSP標準assetを先に読む判断。",
    action: "LauncherとCarSystemUIのasset量を表で比較する。",
    visible: "Home/cardかbarかで読むsource候補が分かれる。",
    trace: "`packages/apps/Car/Launcher` と `CarSystemUI`。",
  },
  b9: {
    title: "Simulatorの温度変更をAAOS emulatorでも確認する",
    context: "教材の再現と本物の検証を分ける。",
    action: "対象buildのemulatorを起動してADBで状態を確認する。",
    visible: "実際の対象versionのUIと挙動を確認できる。",
    trace: "Automotive emulator、ADB、対象buildのhelp。",
  },
  b10: {
    title: "Polestar 3の画面でOEMらしさを探す",
    context: "公開されているメーカー例を断定せず観察する。",
    action: "公式紹介のinterfaceとAOSP例を見比べる。",
    visible: "brand表現や体験差があってもAAOS採用は両立する。",
    trace: "公開情報で確認できる範囲と、実装推測を分離する。",
  },
  i1: { title: "走行速度を画面へ継続表示する", context: "値が変わり続ける場合の受取り方。", action: "speed propertyをSubscribeする。", visible: "速度の変化に合わせて表示が更新される。", trace: "`subscribePropertyEvents` とcallback。" },
  i2: { title: "左右seatの温度範囲を出し分ける", context: "property configをUI設計に使う。", action: "seat areaとmin/maxを読む。", visible: "設定可能範囲外のbuttonを出さない。", trace: "area / access / changeMode config。" },
  i3: { title: "運転席だけ温度を上げる", context: "seat単位propertyとpermissionの例。", action: "driver areaへtemperatureを書込む。", visible: "DRIVER表示だけが変わる。", trace: "HVAC property、areaId、write permission。" },
  i4: { title: "走行開始で検索入力を無効化する", context: "制限をUI requirementとして扱う。", action: "restriction変更を受ける。", visible: "検索入力は止まり、再生操作は残る。", trace: "CarUxRestrictionsManagerとDO要件。" },
  i5: { title: "system bar iconの色を変更する", context: "RROで済む差分の判定。", action: "overlay APKで許可されたresourceを上書きする。", visible: "icon色だけが変わる。", trace: "target package / overlayable / resource。" },
  i6: { title: "通常APKからdoor lockを触ろうとする", context: "許可されない操作でSecurityを読む。", action: "制御APIをpermissionなしで呼ぶ。", visible: "操作は成功しない。", trace: "permission、Privileged allowlist、署名条件。" },
  i7: { title: "画面を閉じたら速度更新を止める", context: "不要なSubscribeを残さない。", action: "画面終了時にunsubscribeする。", visible: "非表示画面が更新され続けない。", trace: "lifecycleとcallback解除。" },
  i8: { title: "bottom barをleft barへ変える", context: "App外の常設領域を扱う。", action: "CarSystemUIのbar配置設定を変更する。", visible: "操作barの置き場所が変わる。", trace: "CarSystemUI resource / window behavior。" },
  i9: { title: "Car SettingsにWi-Fi項目を表示する", context: "XMLとlogicを往復して読む。", action: "Preference項目を選ぶ。", visible: "設定項目が表示され状態を反映する。", trace: "`res/xml` と `PreferenceController`。" },
  i10: { title: "Spotify sourceを車載Media画面に出す", context: "source appと共通UIの分担例。", action: "Media sourceを選択する。", visible: "車向けtemplateに曲とcontrolsが表示される。", trace: "`MediaBrowserService` とMedia template。" },
  i11: { title: "Homeのrecent media cardから再生へ戻る", context: "Launcherが入口になる例。", action: "Home cardを押す。", visible: "Media画面へ移動する。", trace: "Launcher card resourceと起動intent。" },
  i12: { title: "phone callとHVACで依存先を比べる", context: "機能別appの読み分け。", action: "Dialerと温度操作を比較する。", visible: "一方はphone連携、他方はvehicle値が中心。", trace: "Bluetooth/Contacts と HVAC property。" },
  i13: { title: "Navigation案内中だけ音楽を下げる", context: "audio duckingの例。", action: "案内音声scenarioをApply。", visible: "Mediaは止まらず音量が下がる。", trace: "audio usage / zone / ducking config。" },
  i14: { title: "助手席displayに別contentを出す", context: "occupant zoneの例。", action: "Passenger user/displayを割り当てる。", visible: "運転席と別の画面内容になる。", trace: "user / occupant zone / display mapping。" },
  i15: { title: "トンネルでnight themeへ変える", context: "stateとresourceの違いを見る。", action: "night-mode scenarioをApply。", visible: "暗い配色に切り替わる。", trace: "NIGHT_MODE event と night resource。" },
  i16: { title: "色変更とseat温度追加を別分類する", context: "中級の設計判断練習。", action: "二つの変更依頼を分類する。", visible: "色はRRO、値はproperty対応に分かれる。", trace: "変更別のsource pathと検証方法。" },
  a1: { title: "speed eventがAppへ戻る経路を追う", context: "Service内部traceの例。", action: "speed eventを発生させる。", visible: "UI速度表示が更新される。", trace: "Car Service dispatchとSubscribe処理。" },
  a2: { title: "OEM固有seat sensor値を追加する", context: "vendor property追加の例。", action: "新しいsensor値の利用を設計する。", visible: "対応車種だけ新表示を出せる。", trace: "AIDL VHAL property定義とconfig。" },
  a3: { title: "HVAC setを往路と復路で検証する", context: "end-to-end確認。", action: "温度をwriteしeventを受ける。", visible: "操作後の確定値で表示が更新される。", trace: "permission / validation / Subscribe。" },
  a4: { title: "OEM overlayをsystem imageへ載せる", context: "build integrationの例。", action: "overlay packageをproductへ追加する。", visible: "起動時からブランド色が反映される。", trace: "product packagesとRRO同梱。" },
  a5: { title: "駐車後にmaintenanceを実行する", context: "電源制御の例。", action: "Garage Modeで更新jobを実行する。", visible: "利用者不在時に処理し終了する。", trace: "power policyとGarage Mode。" },
  a6: { title: "reverse時の表示をログと画面で照合する", context: "検証手順の例。", action: "gear scenarioをemulatorで再現する。", visible: "Rear camera表示へ切り替わる。", trace: "ADB / dumpsys / 画面記録。" },
  a7: { title: "VHAL変更後に互換性確認を計画する", context: "動作と互換性を分ける。", action: "vendor interface変更をレビューする。", visible: "機能動作だけでは完了扱いにしない。", trace: "対象範囲のCTS/VTS確認。" },
  a8: { title: "同platformで2車種のHVAC差を持つ", context: "variant管理の例。", action: "seat構成差をconfig化する。", visible: "対応車種だけ後席controlsを表示する。", trace: "resource / property support / config。" },
  a9: { title: "Media prebuiltを製品imageへ統合する", context: "unbundled appの例。", action: "配布APKを組み込む。", visible: "Media surfaceが利用可能になる。", trace: "unbundled apps integration docs。" },
  a10: { title: "4件の変更依頼をreviewする", context: "最終演習の具体例。", action: "色、後席audio、新値、走行中検索を分類する。", visible: "それぞれ別の変更場所と検証項目になる。", trace: "official docs / source path / emulator確認。" },
};

export const architectureLayers = [
  {
    layer: "1. App / SystemUI",
    role: "ユーザーに見えるUIとinteraction。まず読む層。",
    elements: "Launcher, Media, Car Settings, HVAC, CarSystemUI, Compose/View/XML",
    paths: ["packages/apps/Car/*", "自社 app/src/main/*"],
    question: "見た目・入力制限・画面所有者はどのappか？",
  },
  {
    layer: "2. android.car API",
    role: "アプリがCar Serviceへ依頼するclient APIとManager群。",
    elements: "Car, CarPropertyManager, CarUxRestrictionsManager, CarAudioManager",
    paths: ["packages/services/Car/car-lib/src/android/car/"],
    question: "アプリが呼ぶpublic/system APIはどれか？",
  },
  {
    layer: "3. Car Service",
    role: "permission、policy、Subscribe、service orchestration。",
    elements: "CarPropertyService, CarAudioService, power/user related services",
    paths: ["packages/services/Car/service/src/com/android/car/"],
    question: "誰がpermissionを検査し、イベントを配るか？",
  },
  {
    layer: "4. VHAL",
    role: "Androidへ公開するvehicle propertyの定義と対応状況。",
    elements: "IVehicle.aidl, VehicleProperty, configs, default implementation",
    paths: ["hardware/interfaces/automotive/vehicle/aidl/"],
    question: "propertyはsupportされ、どのarea/access/change modeか？",
  },
  {
    layer: "5. ECU / Emulator",
    role: "実値を生み、または検証用に値を注入する側。",
    elements: "ECU, in-vehicle network, reference VHAL, Automotive emulator",
    paths: ["vehicle-specific vendor implementation", "Android Automotive emulator"],
    question: "実車値か、emulatorで再現する値か？",
  },
];

export const apiCatalog = [
  {
    title: "Car Serviceへ接続する",
    api: "Car.createCar(context)",
    property: "-",
    access: "connection",
    detail: "Car objectを作り、必要なManagerを取得する。lifecycle終了時は接続を解放する。",
    code: `val car = Car.createCar(context)
val props = car.getCarManager(Car.PROPERTY_SERVICE)
        as CarPropertyManager
car.disconnect()`,
    chain: ["App", "Car client API", "Binder", "Car Service"],
  },
  {
    title: "車速をSubscribeする",
    api: "CarPropertyManager.subscribePropertyEvents(...)",
    property: "VehiclePropertyIds.PERF_VEHICLE_SPEED",
    access: "READ / CONTINUOUS / GLOBAL",
    detail: "連続値はpollingせずeventをSubscribeしてUIへ渡す。valueのunitとstatusを確認する。",
    code: `manager.subscribePropertyEvents(
    VehiclePropertyIds.PERF_VEHICLE_SPEED,
    CarPropertyManager.SENSOR_RATE_UI,
    callback
)`,
    chain: ["VHAL event", "Car Service", "CarPropertyManager", "Speed UI"],
  },
  {
    title: "選択中のギアを読む",
    api: "getIntProperty(...)",
    property: "VehiclePropertyIds.GEAR_SELECTION",
    access: "READ / GLOBAL",
    detail: "返却intをVehicleGear定数に対応づけ、ReverseならEVS表示の検証へ進む。",
    code: `val gear = manager.getIntProperty(
    VehiclePropertyIds.GEAR_SELECTION, 0
)`,
    chain: ["Vehicle gear", "VHAL", "Property manager", "Cluster / EVS"],
  },
  {
    title: "HVAC温度を書く",
    api: "setFloatProperty(...)",
    property: "VehiclePropertyIds.HVAC_TEMPERATURE_SET",
    access: "READ_WRITE / SEAT area",
    detail: "driver seatなどのareaIdを指定する。write permissionとsupported rangeが必要。",
    code: `manager.setFloatProperty(
    VehiclePropertyIds.HVAC_TEMPERATURE_SET,
    VehicleAreaSeat.SEAT_ROW_1_LEFT,
    22.0f
)`,
    chain: ["HVAC UI", "Permission check", "VHAL set", "HVAC ECU/event"],
  },
  {
    title: "走行中UIを制限する",
    api: "CarUxRestrictionsManager",
    property: "driving state / UX restrictions",
    access: "listener",
    detail: "現在のrestrictionを見てkeyboardや複雑操作を無効化する。DO操作は維持する。",
    code: `manager.registerListener { restrictions ->
    searchEnabled = !restrictions.isRequiresDistractionOptimization
}`,
    chain: ["Driving state", "UX policy", "App listener", "Safe UI"],
  },
];

export const glossary = [
  ["AAOS", "車両に組み込まれて動くAndroid Automotive OS。"],
  ["IVI", "In-Vehicle Infotainment。センター画面を中心とした情報/娯楽system。"],
  ["VHAL", "Vehicle HAL。vehicle propertyをAndroidへ公開するinterface。"],
  ["CarPropertyManager", "アプリ側からvehicle propertyを扱うManager。"],
  ["RRO", "Runtime Resource Overlay。許可されたresourceの実行時差し替え。"],
  ["Privileged app", "system imageのpriv-appとして配置され、追加条件の下で強いpermissionを持てるapp。"],
  ["DO", "Driving Optimized。運転中に許可できるよう設計されたinteraction/content。"],
  ["Garage Mode", "ユーザー不在の間に必要なmaintenance処理を行うための車載向け状態。"],
  ["Occupant zone", "driver/passengerなど、displayやaudio/userを割り当てる車室内の領域。"],
];

export const assetStrategy = [
  {
    group: "まず読む",
    apps: "Launcher / Settings / SystemUI",
    reason: "標準asset量が大きく、画面所有・XML・overlay・Controllerがまとまって見える。",
  },
  {
    group: "機能を追う",
    apps: "Media / Dialer / HVAC / Radio",
    reason: "Service連携、phone連携、vehicle property、audio/HALの具体例になる。",
  },
  {
    group: "設計判断",
    apps: "Cluster / Notification / RotaryController",
    reason: "driver display、安全なnotification、rotary inputなど車載固有要件を比較できる。",
  },
  {
    group: "基盤へ降りる",
    apps: "android.car / Car Service / VHAL",
    reason: "Appの挙動をpermission、event dispatch、vehicle property定義へ接続する。",
  },
];

export const ownershipMatrix = [
  {
    layer: "Visible surfaces",
    default: "Launcher / Media / Car Settings / CarSystemUI",
    configure: "theme colors, icon, dimension, bar position via RRO/config",
    extend: "brand Home, custom HVAC surface, passenger experience",
    files: "packages/apps/Car/* / res/* / overlay APK",
  },
  {
    layer: "App behavior",
    default: "PreferenceController / Media service integration",
    configure: "enabled preference, DO config, source ordering",
    extend: "OEM feature Activity / Service / controller logic",
    files: "AndroidManifest.xml / *Controller / service declaration",
  },
  {
    layer: "Car API / Services",
    default: "android.car managers / Car Service policy",
    configure: "permission allowlist, audio/power/user config",
    extend: "platform service change only when property behavior needs it",
    files: "packages/services/Car/* / sysconfig",
  },
  {
    layer: "Vehicle data definition",
    default: "standard VehicleProperty / AIDL VHAL interface",
    configure: "supported property, area, access, min/max",
    extend: "vendor property / ECU adapter implementation",
    files: "hardware/interfaces/automotive/vehicle/aidl / vendor",
  },
];

export const assetPerspectives = [
  {
    title: "1. 画面のowner",
    question: "変えたいものは、どの標準app / System UIが描いているか？",
    example: "Home cardはLauncher、常設barやHVAC入口はCarSystemUI、設定項目はCar Settings、再生画面はMediaから探す。",
    source: "AOSPのCarSystemUI / Car Settings / Media docs",
  },
  {
    title: "2. 変更の方法",
    question: "resource差し替えで済むか、behavior追加が必要か？",
    example: "accent colorやbar iconはRRO/config候補。新しい設定処理や独自画面遷移はApp sourceを検討する。",
    source: "System UI overlay / Car Settings theme customization docs",
  },
  {
    title: "3. 安全と操作制限",
    question: "走行中にも表示・操作してよい機能か？",
    example: "Media再生controlsはDOを前提に再利用しやすい。一方、長い設定入力はUX Restrictionsの扱いが必要。",
    source: "AOSP Media / Driver distraction docs",
  },
  {
    title: "4. 車両データ",
    question: "表示だけか、vehicle propertyへ接続する機能か？",
    example: "温度色の変更はresource。新しいseat sensor値を表示するならproperty定義、support config、App側表示を確認する。",
    source: "AOSP VHAL docs",
  },
  {
    title: "5. 更新と保守",
    question: "AOSP更新を取り込みやすい差分か？",
    example: "SystemUI sourceを直接変更するよりoverlayに閉じる方が、変更fileを明確に保ちやすいと公式docsが説明する。",
    source: "AOSP Automotive System UI docs",
  },
  {
    title: "6. 配布形態",
    question: "platform source内のappか、prebuilt統合のappか？",
    example: "MediaやDialerなどはAndroid 13+でunbundled apps integrationも確認し、source treeに無いことだけで判断しない。",
    source: "AOSP unbundled apps integration docs",
  },
];

export const assetDecisionCases = [
  {
    request: "HomeとSystem barのaccent colorをブランド色へ変えたい",
    start: "Launcher / CarSystemUIのresource名とoverlay許可範囲を読む",
    choice: "OEM configure: RRO / resource overlay",
    benefit: "behaviorを変えず、AOSP更新差分を小さく保ちやすい",
    avoid: "色変更のためにSystemUI source全体をforkする",
  },
  {
    request: "Car Settingsに車両固有の充電設定を追加したい",
    start: "Car SettingsのPreference XMLとController構成を読む",
    choice: "AOSP画面構造を利用し、必要なPreference / Controllerを追加",
    benefit: "車向けUIとdriver distraction配慮の流儀を流用できる",
    avoid: "Phone Settingsの画面をそのまま移植する",
  },
  {
    request: "Spotify等のmedia sourceを車向け画面で安全に表示したい",
    start: "AOSP MediaとMediaBrowserService連携を読む",
    choice: "AOSP Media template / DO playback UIを基盤にする",
    benefit: "browse/playbackの共通体験と制限対応を一から作らずに済む",
    avoid: "走行中操作を考慮しない独自playerを先に作る",
  },
  {
    request: "後席seat sensorという新しい値を表示したい",
    start: "既存standard propertyに相当値があるか、VHAL側のsupport/configを確認",
    choice: "必要ならOEM extend: vendor property + App表示",
    benefit: "既存で表現できない製品機能を扱える",
    avoid: "UIだけ追加して、値の供給元とsupport設定を後回しにする",
  },
];

export const assetTradeoffs = [
  {
    approach: "AOSP standardをそのまま利用",
    fit: "Media playbackや標準Settingsなど、要件と既存機能が近い時",
    merit: "実装量・検証範囲・更新差分を抑えやすい",
    cost: "brand体験や独自操作を十分に表現できない場合がある",
  },
  {
    approach: "RRO / configで調整",
    fit: "色、icon、dimension、bar配置、表示有無の差分",
    merit: "source forkを避け、OEM差分の場所が見えやすい",
    cost: "許可されたresource/config以上のbehavior変更はできない",
  },
  {
    approach: "標準appを基に機能追加",
    fit: "独自Preference、独自Home surface、機能固有flow",
    merit: "AOSPの構造を使いつつ製品要件を実現できる",
    cost: "更新追従とtest範囲が増える",
  },
  {
    approach: "Service / VHALまで追加",
    fit: "標準propertyで表せない車両機能や新しい値",
    merit: "車両固有機能を正しくAndroidへ公開できる",
    cost: "Appだけで完結せず、permission/config/検証の範囲が大きい",
  },
];

export const oemBenchmarks = [
  {
    name: "Polestar 3",
    publicFact: "Polestar公式は、infotainmentがAndroid Automotive OSで動き、Google built-inを備え、Polestar-developed interfaceを持つと説明している。",
    observation: "AAOS採用とOEM独自interfaceは両立する公開例。AOSP/Googleの機能基盤を使っても、visible surfaceはブランドとして設計できる。",
    doNotAssume: "どのAOSP appをfork/RRO/新規実装したかは公開ページだけでは断定しない。",
    url: "https://www.polestar.com/us/polestar-3/technology/",
  },
  {
    name: "Renault Megane E-Tech / OpenR Link",
    publicFact: "Renault公式発表は、OpenR LinkがAndroid Automotive OSで動き、Home/Navigation、Music、Phone、Applications、Vehicleの各spaceを上部menu barで移動できると説明している。",
    observation: "同じAAOS基盤でも、menu構造や画面体験をOEM製品として組み立てられる公開例。",
    doNotAssume: "内部のLauncher/SystemUI変更方法やRRO利用範囲は公開情報から断定しない。",
    url: "https://media.renault.com/world-premiere-all-new-renault-megane-e-tech-100-electric-36825?lang=eng",
  },
];
