import React, { useEffect, useMemo, useState } from "react";
import {
  aospAssets,
  appFocus,
  factMeta,
  figures,
  initialIvi,
  quiz,
  scenarios,
  sources,
} from "./data.js";
import {
  apiCatalog,
  architectureLayers,
  curriculum,
  glossary,
  officialVisuals,
  ownershipMatrix,
} from "./curriculum.js";

const tabs = [
  ["sim", "Simulator"],
  ["courses", "Courses"],
  ["assets", "AOSP Assets"],
  ["files", "File Map"],
  ["figures", "Figures"],
  ["sources", "Fact Check"],
];

const catClass = (cat) => `pill pill--${cat.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

function applyPatch(prev, patch) {
  return { ...prev, ...patch };
}

export default function App() {
  const [tab, setTab] = useState("sim");
  const [ivi, setIvi] = useState(initialIvi);
  const [selectedId, setSelectedId] = useState(scenarios[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);
  const [applied, setApplied] = useState(new Set());
  const [scenarioFilter, setScenarioFilter] = useState("ALL");
  const [figureFilter, setFigureFilter] = useState("ALL");
  const [quizPick, setQuizPick] = useState({});

  const selected = scenarios.find((item) => item.id === selectedId) ?? scenarios[0];
  const scenarioCats = ["ALL", ...new Set(scenarios.map((item) => item.cat))];
  const figureCats = ["ALL", ...new Set(figures.map((item) => item.cat))];

  const shownScenarios = useMemo(
    () =>
      scenarioFilter === "ALL"
        ? scenarios
        : scenarios.filter((item) => item.cat === scenarioFilter),
    [scenarioFilter]
  );

  const shownFigures = useMemo(
    () =>
      figureFilter === "ALL"
        ? figures
        : figures.filter((item) => item.cat === figureFilter),
    [figureFilter]
  );

  const totals = useMemo(() => {
    return aospAssets.reduce(
      (acc, item) => {
        acc.res += item.res;
        acc.layout += item.layout;
        acc.drawable += item.drawable;
        acc.xml += item.xml;
        acc.source += item.source;
        return acc;
      },
      { res: 0, layout: 0, drawable: 0, xml: 0, source: 0 }
    );
  }, []);

  const runScenario = (scenario) => {
    setSelectedId(scenario.id);
    setIvi((prev) => applyPatch(prev, scenario.apply));
    setApplied((prev) => new Set([...prev, scenario.id]));
  };

  const reset = () => {
    setIvi(initialIvi);
    setApplied(new Set());
    setSelectedId(scenarios[0].id);
  };

  const tryFromLesson = (scenarioId) => {
    const scenario = scenarios.find((item) => item.id === scenarioId);
    if (!scenario) return;
    setTab("sim");
    runScenario(scenario);
  };

  return (
    <div className="aaos" style={{ "--accent": ivi.accent }}>
      <header className="topbar">
        <button className="brand" onClick={() => setTab("sim")}>
          <span className="logo">A</span>
          <span>
            <b>Try it AAOS</b>
            <small>Android Automotive study site</small>
          </span>
        </button>
        <nav className="tabs" aria-label="main navigation">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              className={tab === id ? "tab is-on" : "tab"}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <span className="count">
            {applied.size}/{scenarios.length} applied
          </span>
          <button className="ghost-btn" onClick={reset}>
            Reset
          </button>
        </div>
      </header>

      {tab === "sim" && (
        <Simulator
          applied={applied}
          filters={scenarioCats}
          filter={scenarioFilter}
          onFilter={setScenarioFilter}
          scenarios={shownScenarios}
          selected={selected}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onApply={runScenario}
          ivi={ivi}
        />
      )}

      {tab === "courses" && <Courses onTry={tryFromLesson} />}
      {tab === "assets" && <Assets totals={totals} />}
      {tab === "files" && <FileMap />}
      {tab === "figures" && (
        <Figures
          cats={figureCats}
          filter={figureFilter}
          figures={shownFigures}
          onFilter={setFigureFilter}
          picks={quizPick}
          onPick={(figId, idx) => setQuizPick((prev) => ({ ...prev, [figId]: idx }))}
          onRetry={(figId) =>
            setQuizPick((prev) => {
              const next = { ...prev };
              delete next[figId];
              return next;
            })
          }
        />
      )}
      {tab === "sources" && <Sources />}
    </div>
  );
}

function Simulator({
  applied,
  filters,
  filter,
  onFilter,
  scenarios: shown,
  selected,
  selectedId,
  onSelect,
  onApply,
  ivi,
}) {
  return (
    <main className="sim-grid">
      <aside className="side side--left">
        <div className="side-head">
          <h2>Scenario Cards</h2>
          <span>{shown.length}</span>
        </div>
        <div className="filter-row">
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? "filter is-on" : "filter"}
              onClick={() => onFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="scenario-list">
          {shown.map((scenario) => (
            <article
              key={scenario.id}
              className={
                "scenario " +
                (selectedId === scenario.id ? "is-selected " : "") +
                (applied.has(scenario.id) ? "is-applied" : "")
              }
              onClick={() => onSelect(scenario.id)}
            >
              <div className="scenario-top">
                <span className={catClass(scenario.cat)}>{scenario.cat}</span>
                {applied.has(scenario.id) && <span className="done">applied</span>}
              </div>
              <h3>{scenario.title}</h3>
              <p>{scenario.short}</p>
              <div className="scenario-foot">
                <small>{scenario.files[0]}</small>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onApply(scenario);
                  }}
                >
                  Apply
                </button>
              </div>
            </article>
          ))}
        </div>
      </aside>

      <section className="stage">
        <div className="stage-head">
          <div>
            <span className="eyebrow">Virtual IVI</span>
            <h1>XML / VHAL / RROを触ると画面がどう変わるか</h1>
          </div>
          <div className="meta-line">
            <code>app={ivi.app}</code>
            <code>gear={ivi.gear}</code>
            <code>speed={ivi.speed}</code>
            <code>{ivi.accent}</code>
          </div>
        </div>
        <IVI state={ivi} />
        <div className="learning-strip">
          <b>このサイトのScope:</b> mobile Android上で本物のCarService/VHALを動かすのではなく、AAOSの上位レイヤーの挙動を再現する教育用Simulator。実機検証はAAOS emulator + ADBへ接続して拡張する。
        </div>
      </section>

      <aside className="side side--right">
        <Bridge scenario={selected} />
      </aside>
    </main>
  );
}

function IVI({ state }) {
  const fanBars = Array.from({ length: 7 }, (_, index) => index < state.fan);
  return (
    <div className={state.night ? "ivi ivi--night" : "ivi"}>
      <div className="ivi-status">
        <div className="user">
          <span className="avatar">{state.user.includes("11") ? "M" : "D"}</span>
          <span>{state.user}</span>
        </div>
        <div className="chips">
          <span className={state.moving ? "chip chip--warn" : "chip"}>
            {state.moving ? `DRIVING ${state.speed} km/h` : "PARKED"}
          </span>
          {state.restricted && <span className="chip chip--warn">UX_RESTRICTED</span>}
          {state.rearCamera && <span className="chip chip--warn">REAR CAM</span>}
          {state.navDucking && <span className="chip chip--warn">DUCKING</span>}
        </div>
        <div className="clock">10:42</div>
      </div>

      <div className="ivi-main">
        <section className="pane pane--map">
          <div className="pane-title">{state.rearCamera ? "EVS Camera" : "Navigation"}</div>
          {state.rearCamera ? <RearCamera /> : <Map nav={state.navDucking} />}
        </section>

        <section className="pane pane--media">
          <div className="pane-title">Media Template</div>
          <div className="media-card">
            <div className={state.mediaIcon === "oem" ? "cover cover--oem" : "cover"}>
              {state.mediaIcon === "oem" ? "OEM" : "♪"}
            </div>
            <div className="track">
              <small className="track-source">NOW PLAYING / SPOTIFY</small>
              <h3>Night Drive</h3>
              <p>Lofi Trio · MediaBrowserService</p>
              <div className="progress">
                <span style={{ width: state.navDucking ? "28%" : "42%" }} />
              </div>
              <div className="controls">
                <button>◀</button>
                <button className="play">▶</button>
                <button>▶▶</button>
                {state.navDucking && <b>ducking -8dB</b>}
              </div>
              <div className="sources">
                <span>Spotify</span>
                <span>Local</span>
                <span>BT</span>
                <span>Radio</span>
              </div>
            </div>
          </div>
        </section>

        <section className="pane">
          <div className="pane-title">Cluster</div>
          <div className="gauges">
            <Gauge label="Speed" value={state.speed} max={180} unit="km/h" />
            <Gauge label="Power" value={state.moving ? 38 : 0} max={100} unit="%" />
          </div>
          <div className="gears">
            {["P", "R", "N", "D"].map((gear) => (
              <span key={gear} className={state.gear === gear ? "is-on" : ""}>
                {gear}
              </span>
            ))}
            <span className={state.night ? "is-on" : ""}>NIGHT</span>
          </div>
          <div className="outside">
            <span>Outside / Range</span>
            <b>18C · 286 km</b>
          </div>
        </section>
      </div>

      <div className="hvac">
        <div className="temp">
          <small>DRIVER</small>
          <b>{state.driverTemp.toFixed(1)}C</b>
        </div>
        <div className="fan">
          <small>FAN</small>
          <div>
            {fanBars.map((on, index) => (
              <span key={index} className={on ? "on" : ""} />
            ))}
          </div>
          <b>{state.fan}</b>
        </div>
        <div className="toggles">
          <span className={state.ac ? "on" : ""}>A/C</span>
          <span className={state.recirc ? "on" : ""}>RECIRC</span>
          <span>DEFROST</span>
          <span>AUTO</span>
        </div>
        <div className="temp">
          <small>PASSENGER</small>
          <b>{state.passengerTemp.toFixed(1)}C</b>
        </div>
        <div className="quick-dock">
          <span>HOME</span>
          <span>NAV</span>
          <span>MEDIA</span>
          <span>PHONE</span>
          <span>APPS</span>
        </div>
      </div>
    </div>
  );
}

function Gauge({ label, value, max, unit }) {
  const pct = Math.min(1, Math.max(0, value / max));
  const dash = `${pct * 188} 188`;
  return (
    <div className="gauge">
      <svg viewBox="0 0 100 100">
        <path d="M18 68a34 34 0 1 1 64 0" pathLength="188" />
        <path className="gauge-on" d="M18 68a34 34 0 1 1 64 0" pathLength="188" strokeDasharray={dash} />
      </svg>
      <div>
        <small>{label}</small>
        <b>{value}</b>
        <em>{unit}</em>
      </div>
    </div>
  );
}

function Map({ nav }) {
  return (
    <div className="map">
      <svg viewBox="0 0 420 260" preserveAspectRatio="none">
        <path className="street" d="M-10 36 L430 210 M80 -15 L145 280 M300 -15 L235 280" />
        <path d="M-20 220 C110 140 130 50 240 20 C315 0 360 40 440 10" />
        <path d="M-30 60 C70 120 160 120 230 190 C280 240 350 230 450 170" />
        <circle cx="235" cy="150" r="8" />
      </svg>
      <div className="map-search">Where to?</div>
      <span className="poi poi--charge">EV</span>
      <span className="poi poi--coffee">Cafe</span>
      {nav && <span className="nav-chip">Turn right · 200 m</span>}
      <div className="eta">
        <b>12 min</b>
        <span>8.4 km · ETA 10:54</span>
      </div>
    </div>
  );
}

function RearCamera() {
  return (
    <div className="rear">
      <span>REAR CAMERA / 0.8m</span>
      <div className="parking-lines" />
    </div>
  );
}

function Bridge({ scenario }) {
  return (
    <div className="bridge">
      <div className="bridge-head">
        <h2>Code / XML Bridge</h2>
        <span>emulator-5554</span>
      </div>
      <section>
        <span className={catClass(scenario.cat)}>{scenario.cat}</span>
        <h3>{scenario.title}</h3>
        <p>{scenario.short}</p>
        <pre>
          <code>{scenario.code}</code>
        </pre>
      </section>
      <section>
        <h3>どのファイルと紐づく？</h3>
        <ul className="file-list">
          {scenario.files.map((file) => (
            <li key={file}>
              <code>{file}</code>
            </li>
          ))}
        </ul>
      </section>
      <section className="note-box">
        <h3>AOSP default / 注意</h3>
        <p>{scenario.note}</p>
      </section>
    </div>
  );
}

function Courses({ onTry }) {
  const [courseId, setCourseId] = useState(curriculum[0].id);
  const [lessonId, setLessonId] = useState(curriculum[0].modules[0].lessons[0].id);
  const course = curriculum.find((item) => item.id === courseId) ?? curriculum[0];
  const lessons = course.modules.flatMap((module) => module.lessons);
  const selectedLesson = lessons.find((item) => item.id === lessonId) ?? lessons[0];
  const focusReader = () => {
    window.requestAnimationFrame(() => {
      document.querySelector(".lesson-reader")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const changeCourse = (nextCourse) => {
    setCourseId(nextCourse.id);
    setLessonId(nextCourse.modules[0].lessons[0].id);
    focusReader();
  };

  const changeLesson = (nextLessonId) => {
    setLessonId(nextLessonId);
    focusReader();
  };

  return (
    <main className="page">
      <PageHero
        kicker="Structured curriculum"
        title="画面で理解し、fileを追い、設計判断まで進む"
        text="Android smartphoneでSystem UIとAppの境界を読む前提8 lessonsから入り、初級10、中級16、上級10の順に、App layerを軸としてCar Service / VHAL / AOSP integrationへ降りていく。"
      />
      <div className="course-selector">
        {curriculum.map((item) => (
          <button
            key={item.id}
            className={course.id === item.id ? "course-card is-active" : "course-card"}
            onClick={() => changeCourse(item)}
          >
            <div className="course-head">
              <span className={`course-badge course-badge--${item.id}`}>{item.label}</span>
              <code>{item.duration}</code>
            </div>
            <h2>{item.title}</h2>
            <p>{item.goal}</p>
          </button>
        ))}
      </div>
      <section className="curriculum-shell">
        <aside className="lesson-nav">
          <div className="lesson-nav__goal">
            <span className={`course-badge course-badge--${course.id}`}>{course.label}</span>
            <p>{course.goal}</p>
          </div>
          {course.modules.map((module) => (
            <div className="lesson-module" key={module.title}>
              <h3>{module.title}</h3>
              {module.lessons.map((item) => (
                <button
                  key={item.id}
                  className={selectedLesson.id === item.id ? "lesson-link is-active" : "lesson-link"}
                  onClick={() => changeLesson(item.id)}
                >
                  <code>{item.id}</code>
                  <span>{item.title}</span>
                  <small>{item.minutes}m</small>
                </button>
              ))}
            </div>
          ))}
        </aside>
        <article className="lesson-reader">
          <div className="lesson-title">
            <span className="eyebrow">
              {course.label} / {selectedLesson.id} / {selectedLesson.minutes} min
            </span>
            <h2>{selectedLesson.title}</h2>
            <p>{selectedLesson.summary}</p>
          </div>
          <div className="lesson-content">
            {selectedLesson.official && <OfficialVisual visual={selectedLesson.official} />}
            {selectedLesson.figure && (
              <div className="lesson-figure">
                <FigureSvg kind={selectedLesson.figure} />
                <small>概念図: {selectedLesson.title}</small>
              </div>
            )}
            <section className="lesson-points">
              <h3>このlessonで押さえること</h3>
              <ul>
                {selectedLesson.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {selectedLesson.terms && (
                <div className="term-row">
                  {selectedLesson.terms.map((term) => (
                    <code key={term}>{term}</code>
                  ))}
                </div>
              )}
              {selectedLesson.tryId && (
                <button className="primary-btn" onClick={() => onTry(selectedLesson.tryId)}>
                  Simulatorで試す
                </button>
              )}
            </section>
          </div>
          {selectedLesson.code && (
            <section className="reader-panel">
              <h3>Code / XML</h3>
              <pre>
                <code>{selectedLesson.code}</code>
              </pre>
            </section>
          )}
          {selectedLesson.files && (
            <section className="reader-panel">
              <h3>File linkage</h3>
              <div className="linkage-list">
                {selectedLesson.files.map(([from, to, note]) => (
                  <div key={from}>
                    <code>{from}</code>
                    <span>to</span>
                    <code>{to}</code>
                    <small>{note}</small>
                  </div>
                ))}
              </div>
            </section>
          )}
          {selectedLesson.quiz && (
            <details className="reader-quiz">
              <summary>確認クイズ: {selectedLesson.quiz.q}</summary>
              <b>{selectedLesson.quiz.answer}</b>
              <p>{selectedLesson.quiz.explanation}</p>
            </details>
          )}
        </article>
      </section>
    </main>
  );
}

function OfficialVisual({ visual }) {
  return (
    <figure className="official-visual">
      <div className="official-frame">
        <img src={`${import.meta.env.BASE_URL}official/${visual.file}`} alt={visual.alt} />
        {visual.markers.map((marker, index) => (
          <span
            key={marker.label}
            className="official-marker"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            aria-label={`${index + 1}: ${marker.label}`}
          >
            {index + 1}
          </span>
        ))}
      </div>
      <figcaption className="official-caption">
        <b>{visual.title}</b>
        <a href={visual.source} target="_blank" rel="noreferrer">
          {visual.sourceLabel}
        </a>
        <small>{visual.versionNote}</small>
      </figcaption>
      <div className="official-callouts">
        {visual.markers.map((marker, index) => (
          <div key={marker.label}>
            <b>{index + 1}</b>
            <span>
              <strong>{marker.label}</strong>
              {marker.note}
            </span>
          </div>
        ))}
      </div>
      <small className="official-attribution">
        Portions of this page are reproduced from work created and shared by the Android Open Source Project and used
        according to terms described in the{" "}
        <a href="https://developer.android.com/license" target="_blank" rel="noreferrer">
          Content License
        </a>
        . Original source is linked above.
      </small>
    </figure>
  );
}

function Assets({ totals }) {
  return (
    <main className="page">
      <PageHero
        kicker="AOSP standard assets"
        title="AOSP standardとOEM差分の置き場所を先に決める"
        text="まずlayer x ownership mapで変更先を判断し、その後に実測した標準appのasset量から読むrepoを選ぶ。"
      />
      <OwnershipMap />
      <div className="stat-row">
        <Stat label="res files" value={totals.res} />
        <Stat label="layout" value={totals.layout} />
        <Stat label="drawable" value={totals.drawable} />
        <Stat label="xml" value={totals.xml} />
        <Stat label="source" value={totals.source} />
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Repo</th>
              <th>Role</th>
              <th>res</th>
              <th>layout</th>
              <th>drawable</th>
              <th>xml</th>
              <th>source</th>
              <th>HEAD</th>
            </tr>
          </thead>
          <tbody>
            {aospAssets.map((item) => (
              <tr key={item.repo}>
                <td>
                  <a href={`https://android.googlesource.com/platform/packages/apps/Car/${item.repo}/`} target="_blank" rel="noreferrer">
                    {item.repo}
                  </a>
                </td>
                <td>{item.role}</td>
                <td>{item.res}</td>
                <td>{item.layout}</td>
                <td>{item.drawable}</td>
                <td>{item.xml}</td>
                <td>{item.source}</td>
                <td>
                  <code>{item.head}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="footnote">{factMeta.branchNote}</p>
    </main>
  );
}

function OwnershipMap() {
  return (
    <section className="ownership-card">
      <header>
        <span className="eyebrow">Layer x ownership</span>
        <h2>AOSP標準とOEM差分を、変更する場所で分ける</h2>
        <p>縦にstack、横に変更方法を置く。右へ進むほど製品固有の追加、下へ進むほどvehicle契約に近い。</p>
      </header>
      <div className="ownership-grid">
        <b className="ownership-head">Layer</b>
        <b className="ownership-head ownership-head--aosp">AOSP standard / まず再利用</b>
        <b className="ownership-head ownership-head--rro">OEM configure / RRO・config</b>
        <b className="ownership-head ownership-head--oem">OEM extend / 追加実装</b>
        {ownershipMatrix.map((row) => (
          <React.Fragment key={row.layer}>
            <div className="ownership-layer">
              <strong>{row.layer}</strong>
              <code>{row.files}</code>
            </div>
            <div className="ownership-cell ownership-cell--aosp">{row.default}</div>
            <div className="ownership-cell ownership-cell--rro">{row.configure}</div>
            <div className="ownership-cell ownership-cell--oem">{row.extend}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="ownership-legend">
        <span className="legend-aosp">AOSP: source/referenceを確認</span>
        <span className="legend-rro">OEM: resource/config差分</span>
        <span className="legend-oem">OEM: code/VHAL追加</span>
      </div>
    </section>
  );
}

function FileMap() {
  const [view, setView] = useState("apps");
  return (
    <main className="page">
      <PageHero
        kicker="File linkage"
        title="どのファイルがどこと紐づくか"
        text="Android projectはActivityだけ追うと迷子になる。AAOSはXML resource, Manager API, Car Service, VHAL, permission allowlistをセットで読む。"
      />
      <div className="filter-row filter-row--page">
        {[
          ["apps", "Standard apps"],
          ["layers", "Architecture"],
          ["api", "Car API catalog"],
          ["words", "Glossary"],
        ].map(([id, label]) => (
          <button key={id} className={view === id ? "filter is-on" : "filter"} onClick={() => setView(id)}>
            {label}
          </button>
        ))}
      </div>
      {view === "apps" && (
        <>
          <div className="focus-grid">
            {appFocus.map((item) => (
              <article key={item.app} className="focus-card">
                <h2>{item.app}</h2>
                <p>{item.why}</p>
                <div className="default-box">
                  <b>AOSP default</b>
                  <span>{item.defaultBehavior}</span>
                </div>
                <ul>
                  {item.linkage.map((link) => (
                    <li key={link}>
                      <code>{link}</code>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <ReadOrder />
        </>
      )}
      {view === "layers" && (
        <div className="layer-map">
          {architectureLayers.map((item) => (
            <article key={item.layer} className="layer-row">
              <h2>{item.layer}</h2>
              <p>{item.role}</p>
              <code>{item.elements}</code>
              {item.paths.map((path) => (
                <small key={path}>{path}</small>
              ))}
              <b>{item.question}</b>
            </article>
          ))}
        </div>
      )}
      {view === "api" && (
        <div className="api-grid">
          {apiCatalog.map((item) => (
            <article key={item.title} className="api-card">
              <span className="eyebrow">{item.access}</span>
              <h2>{item.title}</h2>
              <code className="api-name">{item.property}</code>
              <p>{item.detail}</p>
              <pre>
                <code>{item.code}</code>
              </pre>
              <div className="flowline flowline--small">
                {item.chain.map((node, index) => (
                  <React.Fragment key={node}>
                    <span>{node}</span>
                    {index < item.chain.length - 1 && <b />}
                  </React.Fragment>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
      {view === "words" && (
        <div className="glossary-grid">
          {glossary.map(([word, definition]) => (
            <article key={word} className="source-card">
              <b>{word}</b>
              <span>{definition}</span>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function ReadOrder() {
  return (
    <section className="wide-card">
      <h2>標準appを読む順番</h2>
      <div className="flowline">
        <span>AndroidManifest.xml</span>
        <b />
        <span>res/xml or res/layout</span>
        <b />
        <span>Controller / Activity</span>
        <b />
        <span>Manager API</span>
        <b />
        <span>Car Service / VHAL</span>
      </div>
    </section>
  );
}

function Figures({ cats, filter, figures: shown, onFilter, picks, onPick, onRetry }) {
  return (
    <main className="page page--figures">
      <PageHero
        kicker="Visual guide"
        title="layer、owner、実画面を一枚につなげる"
        text="小さい単語図は統合し、AOSP standard / OEM差分 / Vehicle contractと、Official IVI画面・file/APIの対応を大きな図で読む。"
      />
      <div className="filter-row filter-row--page">
        {cats.map((cat) => (
          <button key={cat} className={filter === cat ? "filter is-on" : "filter"} onClick={() => onFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div className="figure-grid figure-grid--integrated">
        {shown.map((figure) => (
          <FigureCard
            key={figure.id}
            figure={figure}
            pick={picks[figure.id]}
            onPick={(idx) => onPick(figure.id, idx)}
            onRetry={() => onRetry(figure.id)}
          />
        ))}
      </div>
    </main>
  );
}

function FigureCard({ figure, pick, onPick, onRetry }) {
  const q = quiz[figure.id];
  return (
    <article className="figure-card">
      <header>
        <span>{String(figures.findIndex((item) => item.id === figure.id) + 1).padStart(2, "0")}</span>
        <h3>{figure.title}</h3>
        <span className={catClass(figure.cat)}>{figure.cat}</span>
      </header>
      <RichFigure kind={figure.kind} />
      <p>{figure.text}</p>
      {q && (
        <div className="quiz">
          <b>Q. {q.q}</b>
          <div>
            {q.c.map((choice, idx) => {
              const picked = pick === idx;
              const correct = q.a === idx;
              const showAnswer = pick !== undefined && correct;
              return (
                <button
                  key={choice}
                  className={
                    (picked && correct ? "is-correct " : "") +
                    (picked && !correct ? "is-wrong " : "") +
                    (showAnswer ? "is-answer" : "")
                  }
                  disabled={pick !== undefined && correct}
                  onClick={() => onPick(idx)}
                >
                  {choice}
                </button>
              );
            })}
          </div>
          {pick !== undefined && (
            <small className={pick === q.a ? "ok" : "ng"}>
              {pick === q.a ? "Correct. このまま次へ。" : "Not quite. 正解を確認してRetry。"}
              {pick !== q.a && <button onClick={onRetry}>Retry</button>}
            </small>
          )}
        </div>
      )}
    </article>
  );
}

function RichFigure({ kind }) {
  if (kind === "officialIvi") return <OfficialVisual visual={officialVisuals.aaosHome} />;
  if (kind === "officialSettings") return <OfficialVisual visual={officialVisuals.settingsComponents} />;
  if (kind === "officialUx") return <OfficialVisual visual={officialVisuals.blockedActivity} />;
  if (kind === "ownership") return <OwnershipMap />;

  const diagrams = {
    subscribe: {
      lanes: [
        ["Vehicle / Emulator", "ECU value changes", "HVAC_TEMP / SPEED"],
        ["VHAL", "AIDL IVehicle event", "property + areaId + status"],
        ["Car Service", "permission + dispatch", "supported config"],
        ["App layer", "CarPropertyManager", "Subscribe -> State -> UI"],
      ],
      note: "Read/writeとは別に、変化する値は Subscribe のpathで画面へ戻る。",
    },
    decision: {
      lanes: [
        ["Color / icon", "res/values・drawable", "RROを第一候補"],
        ["Bar placement", "CarSystemUI resource", "RRO or SystemUI config"],
        ["Screen behavior", "Activity / Controller", "App source extension"],
        ["New vehicle data", "Car Service / VHAL", "vendor contract"],
      ],
      note: "変更要求を表層からvehicle契約へ分類すると、不要なplatform forkを避けやすい。",
    },
    mediaFlow: {
      lanes: [
        ["Media source app", "MediaBrowserService", "catalog / playback state"],
        ["Launcher", "serviceをdiscover", "sourceを選択"],
        ["Media template", "共通のvehicle UI", "browse / playback controls"],
        ["System policy", "UX Restrictions", "driving中の操作制限"],
      ],
      note: "MediaBrowserServiceは一語の箱ではなく、source appが公開するServiceとして読む。",
    },
    workflow: {
      lanes: [
        ["Observe", "Official IVI / AOSP app", "ownerを特定"],
        ["Trace", "XML -> Controller -> Manager", "file linkage"],
        ["Modify", "RRO / App / Service / VHAL", "変更場所を選択"],
        ["Verify", "Build -> Emulator -> ADB", "behaviorとpermission"],
      ],
      note: "このサイトの学習順を、実際のAOSP確認フローへ接続する。",
    },
  };
  const diagram = diagrams[kind];
  if (!diagram) return <FigureSvg kind={kind} />;
  return (
    <div className={`integrated-diagram integrated-diagram--${kind}`}>
      {diagram.lanes.map(([label, body, detail], index) => (
        <React.Fragment key={label}>
          <div className="diagram-block">
            <span>{label}</span>
            <b>{body}</b>
            <small>{detail}</small>
          </div>
          {index < diagram.lanes.length - 1 && <i>↓</i>}
        </React.Fragment>
      ))}
      <p>{diagram.note}</p>
    </div>
  );
}

function FigureSvg({ kind }) {
  const labels = {
    boundary: ["Phone app", "Projection", "Car display"],
    stack: ["App", "Car API", "Car Service", "VHAL", "ECU"],
    network: ["ECU", "Network", "VHAL", "IVI", "Cluster"],
    grid: ["Launcher", "SystemUI", "Settings", "Media", "Dialer", "HVAC"],
    pipe: ["ECU", "VHAL", "CarService", "Manager", "UI"],
    binder: ["App process", "Binder", "Car Service"],
    files: ["XML", "Controller", "Manager"],
    layers: ["Dialog", "Overlay", "SystemUI", "Activity", "Wallpaper"],
    media: ["Launcher", "MediaBrowserService", "Media Template"],
    gate: ["Manifest", "Privileged", "Allowlist"],
    state: ["Parked", "Driving", "Restricted"],
    audio: ["Media", "NAV", "Ducking"],
    displays: ["Driver", "Passenger", "Rear"],
    pyramid: ["Reuse", "Overlay", "Extend", "Fork"],
    package: ["Source", "Prebuilt", "System image"],
    oem: ["AOSP", "OEM UI", "Brand"],
    terminal: ["Web", "ADB", "Emulator"],
    timeline: ["Day1", "Day3", "Day7+"],
    seats: ["Driver", "Passenger", "Rear L", "Rear R"],
  };
  const list = labels[kind] ?? labels.pipe;
  if (kind === "media") {
    return (
      <svg className="fig-svg" viewBox="0 0 360 220" role="img" aria-label="media source flow">
        <rect x="1" y="1" width="358" height="218" rx="16" />
        {[
          ["Launcher", ""],
          ["MediaBrowser", "Service"],
          ["Media", "Template"],
        ].map(([first, second], index) => {
          const x = 20 + index * 114;
          return (
            <g key={first}>
              <rect x={x} y="65" width="96" height="62" rx="10" />
              <text x={x + 48} y={second ? 90 : 101} textAnchor="middle">{first}</text>
              {second && <text x={x + 48} y="108" textAnchor="middle">{second}</text>}
              {index < 2 && <path d={`M${x + 96} 96 L${x + 114} 96`} />}
            </g>
          );
        })}
          <text x="180" y="160" textAnchor="middle">{"source discovery -> shared vehicle UI"}</text>
      </svg>
    );
  }
  return (
    <svg className="fig-svg" viewBox="0 0 360 190" role="img" aria-label={kind}>
      <defs>
        <linearGradient id={`g-${kind}`} x1="0" x2="1">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="#7bb7ff" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="358" height="188" rx="16" />
      {kind === "stack" || kind === "layers" ? (
        list.map((label, index) => (
          <g key={label}>
            <rect x={34 + index * 18} y={28 + index * 24} width="230" height="28" rx="8" />
            <text x={48 + index * 18} y={47 + index * 24}>{label}</text>
          </g>
        ))
      ) : (
        list.map((label, index) => {
          const x = 24 + (index % 3) * 108;
          const y = 34 + Math.floor(index / 3) * 62;
          return (
            <g key={label}>
              <rect x={x} y={y} width="92" height="40" rx="10" />
              <text x={x + 46} y={y + 25} textAnchor="middle">{label}</text>
              {index < list.length - 1 && index % 3 !== 2 && <path d={`M${x + 92} ${y + 20} L${x + 108} ${y + 20}`} />}
            </g>
          );
        })
      )}
      {kind === "seats" && (
        <path className="accent-path" d="M80 145h200M120 118v54M240 118v54" />
      )}
      {kind === "audio" && <circle className="accent-dot" cx="250" cy="54" r="16" />}
      {kind === "timeline" && <path className="accent-path" d="M55 144h250" />}
    </svg>
  );
}

function Sources() {
  return (
    <main className="page">
      <PageHero
        kicker="Fact checked"
        title="記載の根拠と注意点"
        text={`Checked: ${factMeta.checkedAt}. 変わりやすい仕様は公式docsとAOSP sourceを優先。`}
      />
      <section className="wide-card">
        <h2>間違えやすい前提</h2>
        <ul className="check-list">
          <li>スマホAndroidアプリ単体では本物のAAOS CarService/VHALは動かない。このサイトは教育用Simulator。</li>
          <li>Android 13+ のVHALはAIDLが中心。Android 12以前はHIDL。</li>
          <li>Officialの画面画像が掲載時のAndroid versionを明示していない場合、「最新versionの画面」とは断定しない。Android 14 / 15 / 16差分はrelease docsと対象emulatorで確認する。</li>
          <li>RROはresource/XML差し替え。behavior変更はCar UI pluginやsource変更を検討。</li>
          <li>画面制御はabsoluteな走行状態より、CarUxRestrictionsManagerが公開するUX restrictionsを監視する。</li>
          <li>古い教材で見かけるCarPropertyManager.registerCallbackはdeprecated。ここではsubscribePropertyEventsを使用する。</li>
          <li>CarPropertyManagerの多くはpermissionが必要。Privileged appやplatform signatureが絡む。</li>
          <li>Android 13+ platform buildではunbundled appsのsourceを直接含めず、prebuilt APK統合の説明がある。</li>
          <li>メーカー例は公開情報で確認できるplatform採用とinterfaceの観察に限定し、内部実装を断定しない。</li>
          <li>公式のAOSP取得手順では android-latest-release manifest の利用が説明されている。branch名は固定で覚えず都度確認する。</li>
        </ul>
      </section>
      <div className="source-grid">
        {sources.map((source) => (
          <a key={source.url} className="source-card" href={source.url} target="_blank" rel="noreferrer">
            <b>{source.label}</b>
            <span>{source.note}</span>
          </a>
        ))}
      </div>
    </main>
  );
}

function PageHero({ kicker, title, text }) {
  return (
    <section className="page-hero">
      <span className="eyebrow">{kicker}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <b>{value.toLocaleString()}</b>
      <span>{label}</span>
    </div>
  );
}
