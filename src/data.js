export const factMeta = {
  checkedAt: "2026-05-24 JST",
  branchNote:
    "AOSPアプリ素材量は android.googlesource.com の packages/apps/Car/* HEAD を浅いcloneで実測。Valuesには多言語 strings.xml が含まれるため、UI素材の多さは Layout/Drawable/Xml も併読する。",
};

export const sources = [
  {
    label: "AOSP VHAL overview",
    url: "https://source.android.com/docs/automotive/vhal?hl=en",
    note: "Android 13+ の VHAL は AIDL / IVehicle.aidl。新規property定義はAIDL側。",
  },
  {
    label: "Android Automotive OS overview",
    url: "https://developer.android.com/training/cars/platforms/automotive-os",
    note: "現行Android DevelopersのAAOS画面例とUX Restrictions例。掲載画像のAndroid versionは本文で明示されない。",
  },
  {
    label: "Android for Cars releases",
    url: "https://developer.android.com/training/cars/platforms/releases",
    note: "Android 14 / 15 / 16でアプリ対応上確認すべき変更を記す公式releaseページ。",
  },
  {
    label: "Android Developers Content License",
    url: "https://developer.android.com/license",
    note: "教材内で引用するOfficial画像の再利用条件とattributionの根拠。",
  },
  {
    label: "AOSP Car UI library",
    url: "https://source.android.com/docs/automotive/hmi/car_ui?hl=en",
    note: "Car UI library, RRO, overlayable resource の考え方。",
  },
  {
    label: "Packages containing car-ui-lib",
    url: "https://source.android.com/docs/automotive/hmi/car_ui/applist?hl=en",
    note: "Car UI library を含むAOSPアプリ一覧。",
  },
  {
    label: "AOSP Automotive System UI",
    url: "https://source.android.com/docs/automotive/hmi/system_ui?hl=en",
    note: "Navigation bar / status bar / overlay path の公式説明。",
  },
  {
    label: "AOSP Car Settings",
    url: "https://source.android.com/docs/automotive/hmi/car_settings?hl=en",
    note: "Car Settings はAAOS専用で、XML Preference + PreferenceController が中心。",
  },
  {
    label: "AOSP Media overview",
    url: "https://source.android.com/docs/automotive/hmi/media?hl=en",
    note: "AOSP Mediaの機能、DO、MediaBrowserService連携。",
  },
  {
    label: "AOSP Media technical details",
    url: "https://source.android.com/docs/automotive/hmi/media/technical_details?hl=en",
    note: "App Launcherが MediaBrowserService をscanする流れ。",
  },
  {
    label: "AOSP unbundled apps integration",
    url: "https://source.android.com/docs/automotive/unbundled_apps/integration?hl=en",
    note: "Dialer / Media / Car UI Library / SMS はunbundled apps。Android 13+ はplatform側にsourceを含めずprebuilt連携。",
  },
  {
    label: "Consume driving state and UX restrictions",
    url: "https://source.android.com/docs/automotive/driver_distraction/consume?hl=en",
    note: "UIはabsoluteなdriving stateではなく、CarUxRestrictionsManagerが公開するrestrictionを監視する。",
  },
  {
    label: "AOSP Garage Mode",
    url: "https://source.android.com/docs/automotive/power/garage_mode?hl=en",
    note: "車両停止後にsystemを一時的にawakeに保ち、JobSchedulerのidle jobを実行する仕組み。",
  },
  {
    label: "Multi-Display Communications API",
    url: "https://source.android.com/docs/automotive/displays/multi-display-comms-api?hl=en",
    note: "occupant zoneがdisplay群とAndroid userを対応づける公式説明。",
  },
  {
    label: "AOSP Audio focus",
    url: "https://source.android.com/docs/automotive/audio/audio-focus?hl=en",
    note: "AAOSでのaudio focus interactionやzone単位の扱いを確認する入口。",
  },
  {
    label: "Download the Android source",
    url: "https://source.android.com/docs/setup/download?hl=en",
    note: "AOSPをsyncする公式手順。android-latest-release manifestの利用を説明。",
  },
  {
    label: "CarPropertyManager API",
    url: "https://developer.android.com/reference/android/car/hardware/property/CarPropertyManager",
    note: "Vehicle specific propertiesへのアプリ向けinterface。registerCallbackはdeprecatedで、subscribePropertyEventsを使う。",
  },
  {
    label: "android.car.Car API",
    url: "https://developer.android.com/reference/android/car/Car",
    note: "Car Serviceへ接続してManagerを取得するtop-level API。",
  },
  {
    label: "Polestar 3 technology",
    url: "https://www.polestar.com/us/polestar-3/technology/",
    note: "メーカー例: Android Automotive OS + Google built-inを掲げる公開車種のinterface観察。",
  },
];

export const initialIvi = {
  speed: 0,
  gear: "P",
  moving: false,
  restricted: false,
  driverTemp: 22,
  passengerTemp: 22,
  fan: 2,
  ac: true,
  recirc: false,
  night: false,
  rearCamera: false,
  accent: "#E6772E",
  mediaIcon: "aosp",
  navDucking: false,
  user: "Driver 0",
  app: "Home",
};

export const scenarios = [
  {
    id: "vhal-hvac-temp",
    cat: "VHAL",
    title: "HVAC_TEMPERATURE_SET を書き換える",
    short: "driver area の温度を 26.0C にする。HVAC stripが即変化。",
    apply: { driverTemp: 26, app: "HVAC" },
    files: [
      "VehiclePropertyIds.HVAC_TEMPERATURE_SET",
      "CarPropertyManager.setFloatProperty(...)",
      "packages/apps/Car/Hvac/res/layout/*",
    ],
    code: `val car = Car.createCar(context)
val mgr = car.getCarManager(Car.PROPERTY_SERVICE) as CarPropertyManager
mgr.setFloatProperty(
    VehiclePropertyIds.HVAC_TEMPERATURE_SET,
    VehicleAreaSeat.SEAT_ROW_1_LEFT,
    26.0f
)`,
    note:
      "実機ではpropertyごとのread/write permissionとareaId configを見る。UIだけ作ってもVHALがsupportしていないpropertyは動かない。",
  },
  {
    id: "vhal-fan-speed",
    cat: "VHAL",
    title: "HVAC_FAN_SPEED を5段にする",
    short: "INT32 propertyのset。min/max外だとIllegalArgumentExceptionになり得る。",
    apply: { fan: 5, app: "HVAC" },
    files: [
      "VehiclePropertyIds.HVAC_FAN_SPEED",
      "CarPropertyConfig.AreaIdConfig",
      "packages/apps/Car/Hvac/src/*",
    ],
    code: `mgr.setIntProperty(
    VehiclePropertyIds.HVAC_FAN_SPEED,
    VehicleAreaSeat.SEAT_ROW_1_LEFT,
    5
)`,
    note:
      "CarPropertyConfigのmin/maxとsupported valuesを読む癖を先に付ける。UI sliderの範囲を固定値で決めない。",
  },
  {
    id: "ux-driving",
    cat: "UX",
    title: "走行中の UX Restrictions",
    short: "speedを入れてmoving扱い。キーボード入力や長文操作をブロックする。",
    apply: { speed: 30, moving: true, restricted: true, app: "Media" },
    files: [
      "CarUxRestrictionsManager",
      "CarDrivingStateManager",
      "packages/apps/Car/Settings/* DO handling",
    ],
    code: `carUxRestrictionsManager.registerListener { restrictions ->
    val blocked = restrictions.activeRestrictions and
        CarUxRestrictions.UX_RESTRICTIONS_NO_KEYBOARD != 0
    searchBox.isEnabled = !blocked
}`,
    note:
      "走行中に消すべきなのは機能そのものではなく、driver distractionになるinteraction。Media再生controlなどDOな操作は残る。",
  },
  {
    id: "gear-reverse",
    cat: "VHAL",
    title: "GEAR_SELECTION = REVERSE",
    short: "gearをRにしてRear camera surfaceを前面に出す流れを体感。",
    apply: { gear: "R", rearCamera: true, app: "EVS" },
    files: [
      "VehiclePropertyIds.GEAR_SELECTION",
      "EVS HAL / CarEvsService",
      "CarSystemUI overlay window",
    ],
    code: `// Conceptual flow
GEAR_SELECTION(REVERSE)
  -> CarService receives VHAL event
  -> EVS / camera service becomes active
  -> SystemUI overlay window shows rear view`,
    note:
      "Reverse cameraは単なるActivityではなく、EVSやSystemUI overlayとの関係で見ると理解が早い。",
  },
  {
    id: "rro-accent",
    cat: "RRO",
    title: "RROでaccent colorを差し替える",
    short: "XML resource差し替えで色だけを全体にcascadeさせる。",
    apply: { accent: "#FF7A1A", app: "Theme" },
    files: [
      "res/values/overlayable.xml",
      "overlay APK AndroidManifest.xml",
      "target package res/values/colors.xml",
    ],
    code: `<overlay
    android:targetPackage="com.android.car.media"
    android:targetName="CarMediaCustomization" />

<color name="car_ui_color_accent">#FF7A1A</color>`,
    note:
      "RROはresource差し替え。処理やlayout inflationのロジック変更までやりたい場合はCar UI pluginやsource変更の領域。",
  },
  {
    id: "systemui-bars",
    cat: "SystemUI",
    title: "SystemUI barのXMLを動かす",
    short: "Left / Bottom / Right system barとHVAC stripの位置を変える。",
    apply: { app: "SystemUI" },
    files: [
      "car_left_system_bar.xml",
      "car_system_bar.xml",
      "config_enableLeftSystemBar",
      "CarSystemBarButton",
    ],
    code: `<bool name="config_enableLeftSystemBar">true</bool>
<bool name="config_enableBottomSystemBar">false</bool>

<!-- layoutにはCarSystemBarViewをtop levelに置く -->`,
    note:
      "AOSP docsではAutomotive System UIは左/下/右barを持てる。OEMはoverlayで配置やbuttonを差し替えるのが入口。",
  },
  {
    id: "media-source",
    cat: "App",
    title: "Media appはActivityではなくServiceで見つかる",
    short: "MediaBrowserServiceをApp LauncherがscanしてMedia templateへ渡す。",
    apply: { app: "Media" },
    files: [
      "MediaBrowserService.SERVICE_INTERFACE",
      "CAR_INTENT_ACTION_MEDIA_TEMPLATE",
      "packages/apps/Car/Media",
      "packages/apps/Car/Launcher",
    ],
    code: `<service android:name=".MusicService" android:exported="true">
  <intent-filter>
    <action android:name="android.media.browse.MediaBrowserService" />
  </intent-filter>
</service>`,
    note:
      "AAOS Mediaでは、source appごとの自由なUIより、Media app/templateが安全なbrowse/playback UIを提供する、という見方が重要。",
  },
  {
    id: "settings-controller",
    cat: "App",
    title: "Car Settings: XML Preference と Controller",
    short: "XMLにPreferenceを置き、business logicはPreferenceControllerへ逃がす。",
    apply: { app: "Settings" },
    files: [
      "packages/apps/Car/Settings/app/res/xml/*.xml",
      "settings:controller=\"...PreferenceController\"",
      "SettingsFragment.getPreferenceScreenResId()",
    ],
    code: `<Preference
    android:key="@string/pk_example"
    android:title="@string/example_title"
    settings:controller="com.android.car.settings.example.ExamplePreferenceController" />`,
    note:
      "AOSP docsは、Car Settingsの多くがSettingsFragment + static XML preference + PreferenceControllerで構成されると説明している。",
  },
  {
    id: "priv-permission",
    cat: "Security",
    title: "Privileged permission と allowlist",
    short: "manifestに書くだけではCar APIの強い権限は通らない。",
    apply: { app: "Permission" },
    files: [
      "AndroidManifest.xml",
      "privapp-permissions-*.xml",
      "allowed_privapp_com.android.*",
      "platform certificate",
    ],
    code: `<privapp-permissions package="com.example.oem.hvac">
  <permission name="android.car.permission.CONTROL_CAR_CLIMATE" />
</privapp-permissions>`,
    note:
      "Privileged app / platform-signed / allowlist / SELinux のどれが必要かを分けて見る。普通のPlay配布アプリで全部触れるわけではない。",
  },
  {
    id: "audio-duck",
    cat: "Audio",
    title: "Navigation guidanceでMediaをducking",
    short: "usageとaudio zoneで、NAV音声の間だけMedia音量を下げる。",
    apply: { navDucking: true, app: "Audio" },
    files: [
      "AudioAttributes.USAGE_ASSISTANCE_NAVIGATION_GUIDANCE",
      "car_audio_configuration.xml",
      "CarAudioService",
    ],
    code: `val attrs = AudioAttributes.Builder()
    .setUsage(AudioAttributes.USAGE_ASSISTANCE_NAVIGATION_GUIDANCE)
    .build()`,
    note:
      "AudioはアプリUIだけでなく、CarAudioContext / bus / zone / ducking policyの組み合わせで理解する。",
  },
  {
    id: "multi-user",
    cat: "User",
    title: "Multi-user / Multi-displayの基本",
    short: "driverとpassenger displayが別userで動く状態をイメージする。",
    apply: { user: "Driver 0 + Passenger 11", app: "Users" },
    files: [
      "CarOccupantZoneManager",
      "User HAL properties",
      "Foreground/background user handling",
    ],
    code: `// Conceptual
occupant zone -> display(s) -> Android user
driver zone: driver user
passenger zone: passenger user`,
    note:
      "IVI全体を1ユーザー1画面で固定して考えると、後席displayやpassenger appの理解で詰まりやすい。",
  },
  {
    id: "night-mode",
    cat: "VHAL",
    title: "NIGHT_MODE とTheme切替",
    short: "車両状態がUI modeへ伝わり、地図やclusterを暗くする。",
    apply: { night: true, app: "Theme" },
    files: [
      "VehiclePropertyIds.NIGHT_MODE",
      "UiModeManager",
      "values-night resources",
    ],
    code: `subscribePropertyEvents(
    VehiclePropertyIds.NIGHT_MODE,
    CarPropertyManager.SENSOR_RATE_ONCHANGE,
    callback
)`,
    note:
      "CarPropertyManagerの古いregisterCallbackはdeprecated。新しい教材ではsubscribePropertyEvents中心に覚える。",
  },
];

export const aospAssets = [
  { repo: "Launcher", head: "a945124", total: 987, res: 721, layout: 36, drawable: 48, values: 623, xml: 4, source: 199, role: "Home, App grid, Recents, Calm mode. 初学者が最初に読む価値が高い。" },
  { repo: "Settings", head: "1b73e25", total: 2184, res: 570, layout: 48, drawable: 169, values: 201, xml: 124, source: 1583, role: "Car Settings. XML PreferenceとControllerの宝庫。" },
  { repo: "SystemUI", head: "901c106", total: 784, res: 366, layout: 87, drawable: 131, values: 111, xml: 15, source: 347, role: "CarSystemUI. bar, overlay, notification, HVAC entryの理解に効く。" },
  { repo: "Dialer", head: "1cbad1a", total: 385, res: 186, layout: 37, drawable: 38, values: 101, xml: 5, source: 171, role: "Bluetooth phone UX. DOと連絡先/通話UIの教材向き。" },
  { repo: "Cluster", head: "fd55074", total: 236, res: 184, layout: 13, drawable: 144, values: 20, xml: 0, source: 41, role: "Driver display / cluster sample。Drawableが多い。" },
  { repo: "Templates", head: "fb52ffb", total: 458, res: 180, layout: 60, drawable: 44, values: 54, xml: 0, source: 251, role: "Template系UIの部品を見る。" },
  { repo: "Notification", head: "3cb3119", total: 255, res: 162, layout: 43, drawable: 16, values: 93, xml: 1, source: 81, role: "Heads-up / notification surfaceの教材。" },
  { repo: "Media", head: "781a817", total: 168, res: 141, layout: 16, drawable: 16, values: 101, xml: 2, source: 20, role: "AOSP Media. MediaBrowserService連携の入口。" },
  { repo: "CompanionDeviceSupport", head: "fc82226", total: 487, res: 141, layout: 22, drawable: 17, values: 94, xml: 1, source: 260, role: "Phone companion / device association。AIDLも多い。" },
  { repo: "SystemUpdater", head: "5fb93e3", total: 109, res: 100, layout: 3, drawable: 5, values: 89, xml: 0, source: 5, role: "OTA UXの小さめ教材。" },
  { repo: "Calendar", head: "4b11958", total: 125, res: 98, layout: 4, drawable: 5, values: 89, xml: 0, source: 19, role: "unbundled appの軽量例。" },
  { repo: "Hvac", head: "38d10b4", total: 70, res: 49, layout: 4, drawable: 37, values: 8, xml: 0, source: 18, role: "HVAC propertyを画面に直結して学ぶのに良い。" },
  { repo: "Radio", head: "39a45c4", total: 90, res: 45, layout: 10, drawable: 24, values: 10, xml: 0, source: 40, role: "Broadcast radio / Mediaとの関係。" },
  { repo: "Messenger", head: "66a5f7f", total: 80, res: 26, layout: 5, drawable: 13, values: 7, xml: 0, source: 47, role: "SMS / messaging sample。" },
  { repo: "RotaryController", head: "3389de9", total: 68, res: 31, layout: 24, drawable: 0, values: 6, xml: 1, source: 26, role: "Rotary input対応を学ぶ。" },
  { repo: "LocalMediaPlayer", head: "71793c9", total: 41, res: 32, layout: 0, drawable: 11, values: 4, xml: 0, source: 5, role: "local media sourceの小型例。" },
  { repo: "LinkViewer", head: "25ae1df", total: 91, res: 88, layout: 1, drawable: 1, values: 86, xml: 0, source: 1, role: "link表示の小型例。" },
  { repo: "LensPicker", head: "5e508b6", total: 32, res: 17, layout: 3, drawable: 8, values: 6, xml: 0, source: 11, role: "camera/lens pickerの小型例。" },
  { repo: "Provision", head: "120c18f", total: 11, res: 3, layout: 1, drawable: 1, values: 1, xml: 0, source: 3, role: "provisioning最小例。" },
];

export const appFocus = [
  {
    app: "Car Launcher",
    why: "ユーザーが最初に見るHome/App grid。Media sourceもここから選ばれる。",
    defaultBehavior: "AOSPではHome screen, app grid, recents, calm modeなどのreferenceがある。",
    linkage: ["AndroidManifest.xml -> launcher Activity", "res/layout/* -> home/card/app grid", "LauncherActivitiesDataSource -> install済みアプリscan", "MediaBrowserService scan -> Media templateへhandoff"],
  },
  {
    app: "CarSystemUI",
    why: "アプリ外の常時表示領域。OEM差別化が大きいが壊すと全画面に効く。",
    defaultBehavior: "Navigation barはleft/bottom/right配置が可能。Status barやnotification panelもSystemUI側。",
    linkage: ["config_enableLeftSystemBar", "car_system_bar.xml / car_left_system_bar.xml", "CarSystemBarButton", "super_status_bar.xml / overlay window"],
  },
  {
    app: "Car Settings",
    why: "XMLがどのControllerへ繋がるかを読む練習に最適。",
    defaultBehavior: "Phone Settingsとは別。AAOS専用のvisual UI, driver distraction最適化, OEM customization entryを持つ。",
    linkage: ["res/xml/*.xml -> PreferenceScreen", "settings:controller -> PreferenceController", "SettingsFragment.getPreferenceScreenResId()", "AndroidManifest.xml -> Activity / intent filter"],
  },
  {
    app: "Media",
    why: "AAOS app layerで最重要。多くのthird-party media appはtemplate連携で体験が決まる。",
    defaultBehavior: "AOSPにはfully functional Media implementationがあり、DOなbrowse/playback experienceを提供する。",
    linkage: ["MediaBrowserService.SERVICE_INTERFACE", "MediaSession API", "CAR_INTENT_ACTION_MEDIA_TEMPLATE", "PlaybackState error -> sign-in/settings flow"],
  },
  {
    app: "Dialer",
    why: "Bluetooth, contacts, call state, DOの具体例が詰まっている。",
    defaultBehavior: "Car UI libraryを使うAOSP Dialer。unbundled app扱いの代表。",
    linkage: ["Bluetooth phone stack", "Contacts provider", "Dialer UI layout", "Car UX restrictions"],
  },
  {
    app: "HVAC / Radio",
    why: "Vehicle propertyとUIの関係が見えやすい。初学者の腹落ちが早い。",
    defaultBehavior: "HVACはVHAL property、Radioはbroadcast radio HALやMediaとの関係で理解する。",
    linkage: ["HVAC_* VehiclePropertyIds", "CarPropertyManager", "BroadcastRadio HAL", "Media/audio focus"],
  },
];

export const figures = [
  { id: "f01", cat: "intro", title: "Android Auto vs AAOS", kind: "boundary", text: "phone projectionと車載OSを最初に分離する。アプリが車側で動きCar APIへ進むのがAAOS。" },
  { id: "f02", cat: "arch", title: "AAOS 5層モデル", kind: "stack", text: "App -> Car API -> Car Service -> VHAL -> ECU。上位レイヤー中心でも、値の道筋は下まで見えるようにする。" },
  { id: "f03", cat: "arch", title: "ECU / Network / Display", kind: "network", text: "ECUの値はvehicle networkとVHALを経由し、IVIやClusterの表示へ届く。" },
  { id: "f04", cat: "apps", title: "基本アプリの全体像", kind: "grid", text: "Launcher, SystemUI, Settings, Mediaを中心に読む。Dialer/HVAC/Radioは具体例として効く。" },
  { id: "f05", cat: "vhal", title: "Propertyの流れ", kind: "pipe", text: "ECUから来た値がVHAL eventになり、Car Service経由でManager subscriptionに届く。" },
  { id: "f06", cat: "api", title: "Car.createCar -> Manager", kind: "binder", text: "アプリはCar objectを作り、必要なManagerを取得する。Binder境界の向こうにCar Serviceがいる。" },
  { id: "f07", cat: "vhal", title: "areaIdとseat zone", kind: "seats", text: "同じpropertyでもdriver seat / passenger seat / GLOBALでareaIdが変わる。" },
  { id: "f08", cat: "rro", title: "RROの3点セット", kind: "files", text: "targetPackage, overlayable, 同名resource。behaviorではなくresource lookupの差し替え。" },
  { id: "f09", cat: "systemui", title: "SystemUI Z-stack", kind: "layers", text: "Activityの外側にNavBar, StatusBar, HVAC strip, overlay, dialogが積まれる。" },
  { id: "f10", cat: "apps", title: "Car Settings XML連携", kind: "files", text: "Preference XMLがController classへつながり、ControllerがManagerやbackendを呼ぶ。" },
  { id: "f11", cat: "apps", title: "Media source選択", kind: "media", text: "App LauncherはMediaBrowserServiceを見つけ、Media templateへcomponentを渡す。" },
  { id: "f12", cat: "security", title: "Permission gate", kind: "gate", text: "manifestだけでは足りない。Privileged, allowlist, signatureの境界を見る。" },
  { id: "f13", cat: "ux", title: "UX Restrictions", kind: "state", text: "走行状態でkeyboard/search/setupなどを止め、DOな操作だけ残す。" },
  { id: "f14", cat: "audio", title: "Audio zoneとducking", kind: "audio", text: "usageとzoneでnavigation guidanceがMediaをduckする。" },
  { id: "f15", cat: "user", title: "Multi-user / display", kind: "displays", text: "driverとpassenger displayが別userで動く設計を前提にする。" },
  { id: "f16", cat: "aosp", title: "AOSP asset活用方針", kind: "pyramid", text: "まず標準assetを読む。変更はApp/RRO/Service/VHALのどこに置くかを決める。" },
  { id: "f17", cat: "build", title: "Unbundled apps", kind: "package", text: "Dialer/Media/Car UI Library/SMSはunbundled。platform buildではprebuilt連携に注意。" },
  { id: "f18", cat: "case", title: "OEM interfaceの読み方", kind: "oem", text: "AAOSとGoogle built-inを採用してもinterfaceはOEMの設計対象。差分の置き場所を見る。" },
  { id: "f19", cat: "debug", title: "ADB bridge学習", kind: "terminal", text: "学習サイトでは疑似反映。発展形はPCのAAOS emulatorへadbで検証する。" },
  { id: "f20", cat: "power", title: "Power / Garage Mode", kind: "timeline", text: "車両電源stateと、ユーザー不在でmaintenanceを行うwindowを把握する。" },
  { id: "f21", cat: "build", title: "SourceからProduct imageへ", kind: "package", text: "AppやRROはproduct構成に組み込み、system imageとemulatorで確認する。" },
  { id: "f22", cat: "roadmap", title: "体系的な学習順序", kind: "timeline", text: "初級で直感、中級でsource読解、上級でintegration判断へ進む。" },
];

export const quiz = {
  f01: { q: "アプリが車両側のOS上で動くのは？", a: 1, c: ["Android Auto", "AAOS", "Bluetooth Projection"] },
  f05: { q: "VHALの新規feature定義で現在中心となるinterfaceは？", a: 1, c: ["HIDL", "AIDL", "gRPC"] },
  f08: { q: "RROで主に変更できるものは？", a: 0, c: ["XML/resource", "Binder protocol", "ECU firmware"] },
  f10: { q: "Car SettingsでXMLのPreferenceからlogicへ繋ぐ代表は？", a: 2, c: ["Activity alias", "BroadcastReceiver", "PreferenceController"] },
  f11: { q: "AAOS Media sourceとして見つけられる代表的なserviceは？", a: 0, c: ["MediaBrowserService", "JobService", "VpnService"] },
  f12: { q: "強いCar permissionでmanifest記述だけでは不足しがちなものは？", a: 1, c: ["drawable", "Privileged allowlist", "font"] },
  f13: { q: "走行中に優先して止めるべきUIは？", a: 2, c: ["Play/Pause", "volume", "keyboard text input"] },
  f17: { q: "unbundled app統合で確認する代表物は？", a: 0, c: ["prebuilt APK", "ECU firmware only", "CAN terminator"] },
};
