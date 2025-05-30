import Head from "next/head";

const Meta = (props) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta charSet="utf-8" />
        <meta rel="icon" href="/favicon.png" />
        <meta name="keywords" content={props.keywords} />
        <meta name="description" content={props.description} />

        <title>{`${props.title}`}</title>
        
      </Head>
    </>
  );
};

Meta.defaultProps = {
  siteTitle: "Jays Travels",
  title: "Jays Travels",
  keywords: "Flights | Hotel | Packages",
  description: "World wide flights & Hotels",
};

export default Meta;
