import Head from 'next/head'

export default function HtmlHead({ title }) {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1; user-scalable=no' />
      { title && <title>{title}</title> }
    </Head>
  )
}
