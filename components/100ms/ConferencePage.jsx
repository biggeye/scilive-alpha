import dynamic from "next/dynamic";
import Head from "next/head";

import Conference from "../../lib/100ms/conference";

const ConferencePage = () => {
        return (
            <>
                <Head>
                    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
                </Head>
                <Conference/>
            </>
    )
}

export default ConferencePage;