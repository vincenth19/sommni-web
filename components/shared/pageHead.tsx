import Head from "next/head";
import { FC } from "react";

interface PageHeadProps {
  title: string;
}

const PageHead: FC<PageHeadProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={`${title}`} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default PageHead;
