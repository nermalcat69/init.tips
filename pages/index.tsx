import Head from "next/head";
import { useEffect, useState } from "react";

const useTemp = () => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  return [copied, () => setCopied(true)] as [boolean, () => void];
};

const CodeBlock: React.FC = () => {
  const [copied, update] = useTemp();
  return (
    <>
      <code
        className="bg-gray-700 transition hover:bg-gray-500 text-gray-200 px-4 py-2 rounded cursor-pointer"
        onClick={() => {
          window.navigator.clipboard.writeText("npx create-next-app --ts");
          update();
        }}
      >
        npx create-next-app --ts
      </code>
      <div
        className={`mt-2 opacity-1 ${
          !copied && "opacity-0 duration-500 transition-opacity"
        }`}
      >
        Copied Successfully!
      </div>
    </>
  );
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>Init</title>
        <meta
          name="description"
          content="Our current recommendation for initializing a new project"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="flex flex-col items-center animate-fade-in-down h-screen justify-center cursor-default">
        <div className="text-xl p-4">We Recommend Using</div>
        <CodeBlock />
      </div>
    </div>
  );
}
