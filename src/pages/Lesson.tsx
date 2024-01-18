import WalletBar from "@/components/WalletConnect";
import {
  BackwardIcon,
  Bars4Icon,
  CheckIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { rust } from "@codemirror/lang-rust";
import {
  checkIsContract,
  codeAnwserContent,
  codePlaceholderContent,
  mdDisplayName,
} from "@/utils";
import { useParams } from "react-router-dom";
import CairoWorker from "@/utils/worker.js?worker";
import toast, { Toaster } from "react-hot-toast";
import StarknetIcon from "@/assets/starknet.svg";
import { Link } from "react-router-dom";

const worker = new CairoWorker();

export default function Component() {
  let { lessonId: _lessonId } = useParams<{ lessonId: string }>();

  const [lessonId, setLessonId] = useState(Number(_lessonId || 1));
  //   const [codePlaceHolder, setCodePlaceHolder] = useState("");
  const [value, setValue] = useState("");

  const [MarkdownComponent, setMarkdownComponent] =
    useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    import(`@/mds/${lessonId}.md`).then((res) => {
      setMarkdownComponent(() => res.default);
    });
    // setCodePlaceHolder(codePlaceholderContent[lessonId - 1]);
    setValue(codePlaceholderContent[lessonId - 1]);
    setCompileResult("Compiling...\nThis may take a few seconds.  ");
    setOutputResult("Output\nThis may take a few seconds.  ");

    window.history.pushState({}, "0", `/lesson/${lessonId}`);
  }, [lessonId]);

  const [showResult, setShowResult] = useState(true);
  const [compileResult, setCompileResult] = useState(
    "Compiling...\nThis may take a few seconds.  "
  );
  const [outputResult, setOutputResult] = useState(
    "Output\nThis may take a few seconds.  "
  );

  const onChange = useCallback((val: any) => {
    setValue(val);
  }, []);

  const [compileLoading, setCompileLoading] = useState(false);
  const [runLoading, setRunLoading] = useState(false);
  const [availableGas, setAvailableGas] = useState("10000");
  const [printFullMemory, setPrintFullMemory] = useState(false);
  const [useCairoDebugPrint, setUseCairoDebugPrint] = useState(true);

  const handleCompile = () => {
    const cairo_program = value;
    if (
      cairo_program == "" ||
      cairo_program == null ||
      cairo_program == undefined
    ) {
      return;
    }
    setCompileLoading(true);
    if (checkIsContract(cairo_program)) {
      worker.postMessage({
        data: cairo_program,
        replaceIds: false,
        functionToRun: "compileStarknetContract",
      });
    } else {
      worker.postMessage({
        data: cairo_program,
        replaceIds: false,
        functionToRun: "compileCairoProgram",
      });
    }

    worker.onmessage = function (e) {
      console.log(e, "msg");
      setCompileResult(e.data);
      setCompileLoading(false);
      setShowResult(true);
    };
  };

  const handleRun = () => {
    const cairo_program = value;
    if (
      cairo_program == "" ||
      cairo_program == null ||
      cairo_program == undefined
    ) {
      return;
    }
    setRunLoading(true);
    const gasValue = availableGas;
    worker.postMessage({
      data: cairo_program,
      availableGas: gasValue == "" ? undefined : parseInt(gasValue),
      printFullMemory: printFullMemory,
      useDBGPrintHint: useCairoDebugPrint,
      functionToRun: "runCairoProgram",
    });
    worker.onmessage = function (e) {
      setOutputResult(e.data);
      setRunLoading(false);
      setShowResult(false);

      if (e.data.indexOf(codeAnwserContent[lessonId - 1]) > -1) {
        toast.success(
          () => (
            <div>
              <p>Congratulations! </p>
              <p>You have passed this lesson!</p>
            </div>
          ),
          {
            duration: 3000,
          }
        );

        const lessonPass = localStorage.getItem("lessonPass");
        if (lessonPass) {
          const lessonPassArr = JSON.parse(lessonPass);
          if (lessonPassArr.indexOf(lessonId) < 0) {
            lessonPassArr.push(lessonId);
            localStorage.setItem("lessonPass", JSON.stringify(lessonPassArr));
          }
        } else {
          localStorage.setItem("lessonPass", JSON.stringify([lessonId]));
        }
      }
    };
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex-grow flex-1 cursor-default flex items-center">
          <img src={StarknetIcon} className="w-10 rounded-lg mr-4" alt="" />
          <h1 className="font-bold text-lg">Starknet Lesson</h1>
        </div>{" "}
        <div className="flex space-x-2 flex-1">
          <button className="btn btn-ghost" onClick={() => handleCompile()}>
            Compile
            {compileLoading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </button>
          <button
            className="btn btn-active btn-neutral"
            onClick={() => handleRun()}
          >
            Run
            {runLoading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </button>
        </div>
        <div>
          <WalletBar />
        </div>
      </div>
      <div className="flex flex-grow overflow-scroll bg-white">
        <div className="flex flex-col w-1/2">
          <div className="flex-grow p-4 pl-12 bg-white overflow-scroll">
            <div className="prose">
              {MarkdownComponent && <MarkdownComponent />}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex-grow px-4 bg-white border-l">
            <div className="w-full">
              <CodeMirror
                value={value}
                extensions={[rust()]}
                onChange={onChange}
                height="500px"
                maxHeight="auto"
                className="w-full outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col border-l">
            <div className="flex items-center p-4 bg-white">
              <div
                onClick={() => setShowResult(true)}
                className={`flex items-center space-x-2 mr-2 btn btn-active ${
                  showResult ? "btn-neutral" : ""
                }`}
              >
                <span>Compile Result</span>
              </div>
              <div
                onClick={() => setShowResult(false)}
                className={`flex items-center space-x-2 btn btn-active ${
                  !showResult ? "btn-neutral" : ""
                }`}
              >
                <span>Output</span>
              </div>
            </div>
            <div className="p-4 bg-gray-100 flex-1">
              {showResult ? (
                <textarea
                  className="h-full bg-gray-50 p-4 w-full resize-none border-none outline-none"
                  readOnly
                  value={compileResult}
                />
              ) : (
                <textarea
                  className="h-full bg-gray-50 p-4 w-full resize-none border-none outline-none"
                  readOnly
                  value={outputResult}
                />
              )}
            </div>
          </div>
        </div>
        <Toaster reverseOrder={false} />
      </div>
      <div className="w-full h-10 p-4 pl-6 bg-white flex items-center">
        <div className="drawer w-auto">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="drawer-button flex">
              <div className="tooltip cursor-pointer" data-tip="Menu">
                <Bars4Icon className="w-8 h-8" />
              </div>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {mdDisplayName.map((item: string, index: number) => {
                return (
                  <li key={index}>
                    <Link
                      to={`/lesson/${index + 1}`}
                      onClick={() => {
                        const close: any = document.querySelector(
                          '[aria-label="close sidebar"]'
                        );
                        close && close.click();
                        setLessonId(index + 1);
                      }}
                    >
                      {index + 1}. {item}
                      {localStorage.getItem("lessonPass") &&
                        JSON.parse(
                          localStorage.getItem("lessonPass") || ""
                        ).indexOf(index + 1) > -1 && (
                          <CheckIcon className="w-6 h-6 text-green-600 flex justify-self-end" />
                        )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {lessonId !== 1 && (
          <div>
            <BackwardIcon
              className="w-8 h-8 ml-4"
              onClick={() => {
                lessonId > 1 && setLessonId(lessonId - 1);
              }}
            />
          </div>
        )}
        <div>
          <ForwardIcon
            className="w-8 h-8 ml-4"
            onClick={() => {
              lessonId < 14 && setLessonId(lessonId + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
