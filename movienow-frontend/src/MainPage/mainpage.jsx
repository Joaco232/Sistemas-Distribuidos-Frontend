import React from "react";
import ThreeDImageRing from "../components/ThreeDImageRing/ThreeDImageRing.jsx";

import "./mainpage.css";

export default function MainPage() {
  const posters = [
    "https://images.search.yahoo.com/images/view;_ylt=AwrirknlTPFoXLgPUSWJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2Y1ZmQ4NWY1YzY2ZGNjMGQ2NTk0ZjFjMjBjMjJmMDc2BGdwb3MDMQRpdANiaW5n?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3DHow%2Bto%2BTrain%2BYour%2BDragon%2Bposters%26type%3DE210US91215G0-E210US91215G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D1&w=1500&h=2000&imgurl=posterspy.com%2Fwp-content%2Fuploads%2F2020%2F01%2FHow-To-Train-Your-Dragon-Poster2_2K.jpg&rurl=https%3A%2F%2Fposterspy.com%2Fposters%2Fhow-to-train-your-dragon-the-hidden-world-by-joel-jensen%2F&size=932KB&p=How+to+Train+Your+Dragon+posters&oid=f5fd85f5c66dcc0d6594f1c20c22f076&fr2=piv-web&fr=mcafee&tt=How+To+Train+Your+Dragon%3A+The+Hidden+World+By+Joel+Jensen+%7C+Poster+By+...&b=0&ni=21&no=1&ts=&tab=organic&sigr=EO8Ps923Haa_&sigb=v2oBKrbmwGoY&sigi=skKAgrKeXHbh&sigt=51NqtWrmsvgt&.crumb=9q1mZSz68.N&fr=mcafee&fr2=piv-web&type=E210US91215G0-E210US91215G0",
    "https://tse3.mm.bing.net/th/id/OIP.BWjUgjevYDbpA28aYCNangHaLH?pid=Api&P=0&h=220",
    "https://tse3.mm.bing.net/th/id/OIP.JYEjX3ctYTNomMnGZDhV0gHaLu?pid=Api&P=0&h=220",
    "https://tse1.mm.bing.net/th/id/OIP.bSCvriVPVFHyy-z_UvXzeQHaK8?pid=Api&P=0&h=220",
    "https://tse2.mm.bing.net/th/id/OIP.EsVe2y6NARf5cCxR3JTxjAHaKs?pid=Api&P=0&h=220",
    "https://tse2.mm.bing.net/th/id/OIP.VT_NF9P57YWCsrK8JkLeOAHaKf?pid=Api&P=0&h=220",
    "https://i.etsystatic.com/47295155/r/il/fa3ec1/5571242175/il_1140xN.5571242175_3mjg.jpg",
    "https://tse4.mm.bing.net/th/id/OIP.r3ZNvpuQ4fRoHaAEwgI8tAHaLG?pid=Api&P=0&h=220",
    "https://i.pinimg.com/originals/7d/ef/b5/7defb5bf9b0b4ac5d50382707d637d63.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.h0yewyE3fCfnZimNCMYZzQHaK-?pid=Api&P=0&h=220",
    "https://i.pinimg.com/originals/15/78/2e/15782ed428330f94c978a3d4e8a09307.png",
    "https://tse1.mm.bing.net/th/id/OIP.paj1_ufxdoX2KGTJH11JIgHaKQ?pid=Api&P=0&h=220"
  ];

  return (
    <div className="main-page">
      <header className="main-header">
        <h1 className="main-title">MovieNow</h1>
      </header>

      <section className="main-section">
        <ThreeDImageRing
          images={posters}
          width={400}
          imageDistance={600}
          backgroundColor="transparent"
        />
      </section>

      <section className="filler-section">
        <p>⬇️ Scrolleá para probar el efecto y ver si el ring se mantiene suave.</p>
      </section>
    </div>
  );
}