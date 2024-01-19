// app/pdf417BarcodeGenerator/page.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from '@chakra-ui/react';
import * as PDF417 from '@/lib/pdf417/pdf417-min';


const Pdf417BarcodeGenerator = () => {
    const textAreaRef = useRef(null);
    const canvasRef = useRef(null);

    const generateBarcode = () => {
        const textToEncode = textAreaRef.current.value;
        PDF417.init(textToEncode);
        const barcode = PDF417.getBarcodeArray();

        const bw = 2;
        const bh = 2;

        const canvas = canvasRef.current;
        canvas.width = bw * barcode['num_cols'];
        canvas.height = bh * barcode['num_rows'];
        const ctx = canvas.getContext('2d');

        let y = 0;
        for (let r = 0; r < barcode['num_rows']; ++r) {
            let x = 0;
            for (let c = 0; c < barcode['num_cols']; ++c) {
                if (barcode['bcode'][r][c] === 1) {
                    ctx.fillRect(x, y, bw, bh);
                }
                x += bw;
            }
            y += bh;
        }
    };

    useEffect(() => {
        const hub3Code = `HRVHUB30\nHRK\n000000000012355\nZELJKO SENEKOVIC\nIVANECKA ULICA 125\n42000 VARAZDIN\n2DBK d.d.\nALKARSKI PROLAZ 13B\n21230 SINJ\nHR1210010051863000160\nHR01\n7269-68949637676-00019\nCOST\nTroskovi za 1. mjesec\n`;
        textAreaRef.current.value = hub3Code;
        generateBarcode();
    }, []);

    return (
        <div className="p-4">
            <p>Text to encode</p>
            <textarea ref={textAreaRef} className="w-full h-48 p-2 border border-gray-300 rounded" />
            <p className="mt-2">
                <Button onClick={generateBarcode}>Generate</Button>
            </p>
            <p>PDF417 2D barcode in canvas</p>
            <div id="barcode">
                <canvas ref={canvasRef} className="border border-gray-300" />
            </div>
            <p>(test using your mobile phone barcode scanner or right click on the barcode image and save as image file, then decode using <a href="https://zxing.org/w/decode.jspx" className="text-blue-600 hover:underline">https://zxing.org/w/decode.jspx</a>)</p>
        </div>
    );
};

export default Pdf417BarcodeGenerator;
