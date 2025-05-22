// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
      <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11220165929"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11220165929');
            `,
          }}
        />
      <script
        id="microsoft-uet-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.uetq = window.uetq || [];
            window.uetq.push('config', 'tcf', { 'enabled': true });
          `,
        }}
      />
        <script
          dangerouslySetInnerHTML={{
            
            __html: `(function(w,d,t,r,u){
              w[u]=w[u]||[];f=function(){
                var o={ti:"97180824",enableAutoSpaTracking:true};
                o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")
              };
              n=d.createElement(t);n.src=r;n.async=1;
              n.onload=n.onreadystatechange=function(){
                var s=this.readyState;
                (s&&s!=="loaded"&&s!=="complete")||(f(),n.onload=n.onreadystatechange=null)
              };
              i=d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n,i)
            })(window,document,"script","//bat.bing.com/bat.js","uetq");`
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}