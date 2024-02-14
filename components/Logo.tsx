import React, { useState, useEffect } from 'react';


const Logo = () => {
  const [color, setColor] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((color + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, [color]);

  const hue = color;
  const saturation = 100;
  const lightness = 50;

  const colorStyle = {
    fill: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
  };

  return (
    <svg style={colorStyle} className="Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700">
<path fill="#17181a" d="
  M 632.83 2.58
  A 0.19 0.19 0.0 0 1 632.57 2.84
  Q 631.80 2.40 631.30 1.58
  Q 630.98 1.07 631.52 1.33
  Q 632.31 1.70 632.83 2.58
  Z"
/>
<path fill="#17181a" d="
  M 48.42 164.71
  Q 49.01 164.99 49.65 164.99
  Q 60.78 165.01 71.82 165.00
  A 2.17 2.17 0.0 0 0 73.99 162.83
  Q 74.03 90.40 73.95 22.87
  Q 73.94 20.68 74.74 18.66
  Q 79.31 7.09 91.47 7.06
  Q 160.05 6.93 234.62 7.02
  C 240.24 7.02 246.99 12.01 247.01 18.06
  Q 247.06 35.26 247.28 53.39
  C 247.32 57.15 249.74 65.40 244.75 67.22
  C 240.43 68.79 234.16 68.43 230.05 67.52
  C 227.63 66.98 225.87 65.06 225.95 62.50
  Q 226.13 56.41 225.88 50.85
  C 225.63 45.69 220.12 44.00 215.85 44.01
  Q 169.87 44.03 122.11 44.00
  C 118.97 44.00 113.24 45.51 112.09 48.97
  Q 110.98 52.29 110.98 56.75
  Q 111.00 157.00 111.01 257.25
  Q 111.01 262.48 115.90 262.72
  Q 122.37 263.04 128.10 263.06
  Q 131.49 263.07 131.88 266.40
  Q 132.49 271.69 131.89 277.37
  C 131.49 281.06 129.16 282.91 125.66 282.95
  Q 102.84 283.19 80.64 282.95
  C 76.98 282.91 74.00 280.32 74.00 276.48
  Q 73.99 231.18 74.00 185.06
  A 1.06 1.06 0.0 0 0 72.95 184.00
  Q 65.27 183.96 57.46 184.03
  C 55.23 184.05 50.04 185.25 49.06 187.85
  C 47.93 190.88 48.09 194.51 48.08 199.50
  Q 48.01 243.52 48.02 284.50
  C 48.02 288.79 46.11 290.99 42.00 291.00
  Q 29.80 291.03 17.98 291.03
  Q 11.01 291.02 11.01 284.06
  Q 10.98 225.26 11.01 150.81
  C 11.01 147.80 12.50 144.01 16.10 144.03
  Q 26.73 144.07 37.41 143.04
  C 42.37 142.56 47.70 144.15 47.90 150.02
  Q 48.13 156.58 47.98 163.99
  A 0.76 0.75 -76.7 0 0 48.42 164.71
  Z"
/>
<path fill="#17181a" d="
  M 534.42 125.30
  A 0.61 0.60 -23.8 0 0 534.06 126.22
  C 541.88 138.01 534.12 153.73 522.34 159.55
  Q 505.47 167.87 490.54 154.71
  C 483.51 148.51 480.12 138.06 481.61 129.13
  Q 484.56 111.38 500.80 105.82
  Q 507.43 103.55 514.75 104.26
  C 523.70 105.13 532.86 105.02 542.16 104.58
  Q 558.93 103.80 575.19 104.01
  C 579.69 104.06 583.93 100.97 583.95 96.21
  Q 584.03 74.96 583.98 51.78
  C 583.97 48.25 579.71 44.01 576.14 44.01
  Q 509.29 44.00 442.73 44.05
  C 440.60 44.05 438.52 44.64 437.18 46.44
  Q 435.11 49.22 435.05 52.40
  Q 434.74 68.91 435.07 81.44
  Q 435.10 82.85 436.36 83.62
  Q 455.02 95.02 455.01 116.84
  Q 454.95 199.14 455.06 287.17
  C 455.07 297.34 453.76 306.50 448.64 315.45
  C 444.23 323.16 434.87 329.62 426.46 331.78
  Q 420.71 333.26 412.87 333.18
  Q 389.99 332.94 370.06 333.01
  A 2.07 2.06 0.0 0 1 367.99 330.95
  L 368.00 291.97
  A 1.82 1.81 -0.6 0 1 369.78 290.16
  L 378.79 289.99
  A 4.47 4.45 21.9 0 0 381.83 288.70
  Q 397.85 272.69 412.99 257.59
  C 415.09 255.50 415.95 253.67 416.05 250.49
  C 416.23 244.13 416.00 235.79 416.00 231.51
  Q 416.00 192.36 416.00 153.17
  A 3.64 3.59 25.5 0 0 415.16 150.86
  C 412.40 147.53 408.91 145.13 405.87 142.14
  Q 398.20 134.59 390.43 126.96
  C 386.50 123.09 382.08 119.62 378.13 115.79
  A 2.79 2.78 -22.5 0 0 376.21 115.00
  L 370.06 114.97
  A 2.08 2.07 0.3 0 1 367.99 112.89
  Q 368.05 80.27 367.95 51.83
  C 367.93 45.37 363.26 43.96 357.64 43.97
  Q 342.50 43.98 327.47 44.05
  C 322.42 44.07 322.00 47.33 322.00 51.43
  Q 322.00 99.70 322.00 145.06
  A 0.89 0.89 0.0 0 1 321.14 145.95
  Q 316.15 146.10 311.17 146.05
  C 307.35 146.00 303.99 146.23 303.99 141.85
  Q 304.02 95.89 303.97 50.36
  C 303.97 47.65 303.56 44.50 300.01 44.32
  Q 291.02 43.86 280.54 43.94
  C 275.10 43.99 272.92 39.83 272.95 34.91
  Q 273.01 25.66 273.01 17.16
  C 273.02 10.86 274.66 7.09 281.67 7.08
  Q 321.92 7.00 370.35 6.93
  Q 376.46 6.92 379.93 8.37
  C 388.57 11.99 391.13 19.16 391.08 28.24
  Q 390.95 52.19 391.02 74.83
  A 1.17 1.17 0.0 0 0 392.19 76.00
  L 415.25 76.00
  A 0.74 0.74 0.0 0 0 415.99 75.26
  Q 416.07 51.13 415.90 21.45
  Q 415.88 17.08 417.28 14.11
  C 420.71 6.80 427.80 7.12 434.75 7.10
  Q 499.60 6.96 579.25 7.00
  Q 584.10 7.01 588.79 8.73
  Q 605.95 15.04 615.01 30.96
  Q 620.02 39.77 620.02 48.76
  Q 620.00 85.16 620.00 122.32
  Q 620.00 125.00 617.32 125.00
  Q 577.42 125.01 536.60 125.01
  Q 535.53 125.01 534.42 125.30
  Z
  M 420.5648 126.5898
  A 15.14 14.94 87.9 0 0 434.9400 110.9125
  A 15.14 14.94 87.9 0 0 419.4552 96.3302
  A 15.14 14.94 87.9 0 0 405.0800 112.0075
  A 15.14 14.94 87.9 0 0 420.5648 126.5898
  Z
  M 435.02 297.62
  A 15.36 15.36 0.0 0 0 419.66 282.26
  A 15.36 15.36 0.0 0 0 404.30 297.62
  A 15.36 15.36 0.0 0 0 419.66 312.98
  A 15.36 15.36 0.0 0 0 435.02 297.62
  Z"
/>
<path fill="#17181a" d="
  M 47.99 9.78
  L 47.96 96.89
  Q 47.96 98.99 45.86 98.99
  L 14.23 99.00
  A 2.23 2.22 0.0 0 1 12.00 96.78
  Q 12.00 71.73 11.99 50.96
  C 11.99 34.22 20.87 21.24 34.84 12.66
  Q 40.66 9.08 46.79 8.67
  A 1.12 1.11 -2.2 0 1 47.99 9.78
  Z"
/>
<path fill="#17181a" d="
  M 276.67 129.67
  Q 276.95 129.25 276.95 128.75
  Q 276.96 93.98 277.06 59.09
  Q 277.07 56.36 279.48 57.64
  L 279.97 57.90
  Q 281.98 58.97 281.98 61.25
  Q 281.99 95.61 282.02 130.00
  C 282.02 131.24 282.29 132.52 283.26 133.55
  C 292.48 143.36 287.42 158.21 273.72 159.49
  C 267.40 160.08 261.55 154.85 259.23 149.44
  C 257.92 146.38 258.72 143.15 259.01 140.03
  C 259.55 134.37 266.47 129.88 271.79 130.01
  Q 274.00 130.06 276.09 130.00
  Q 276.46 129.99 276.67 129.67
  Z"
/>
<path fill="#17181a" d="
  M 504.97 73.24
  C 507.03 68.18 508.26 66.03 513.80 64.47
  C 522.32 62.06 529.94 71.08 527.97 79.19
  Q 526.36 85.84 520.05 87.72
  C 516.52 88.78 509.35 88.05 507.02 84.05
  Q 505.98 82.26 505.26 80.33
  A 1.92 1.91 80.5 0 0 503.51 79.07
  Q 491.03 78.74 479.82 79.09
  Q 478.93 79.11 477.95 79.31
  Q 477.47 79.41 477.09 79.72
  C 475.38 81.10 473.85 82.80 471.70 83.54
  Q 464.38 86.08 461.53 78.99
  Q 459.30 73.44 464.34 70.34
  C 468.68 67.68 472.67 68.94 475.85 72.37
  C 477.74 74.40 480.36 73.95 482.75 73.98
  Q 493.20 74.10 503.92 73.95
  Q 504.68 73.94 504.97 73.24
  Z"
/>
<path fill="#17181a" d="
  M 560.32 87.66
  C 553.94 89.13 546.69 87.77 544.20 81.00
  Q 543.62 79.43 543.90 74.01
  Q 544.01 71.85 545.12 70.24
  C 549.46 63.95 556.52 62.26 562.65 67.24
  Q 571.21 74.19 565.09 84.51
  C 564.26 85.90 561.98 87.28 560.32 87.66
  Z"
/>
<path fill="#17181a" d="
  M 133.70 138.67
  A 1.46 1.45 85.8 0 0 134.93 137.24
  Q 135.04 114.55 134.99 91.62
  Q 134.99 89.91 133.32 89.51
  C 131.66 89.12 130.04 88.27 128.93 86.94
  Q 123.96 80.98 126.16 73.02
  C 127.89 66.77 135.47 63.72 141.14 65.28
  Q 149.26 67.51 150.82 76.14
  C 151.31 78.85 150.19 81.73 148.97 84.17
  Q 146.51 89.13 140.65 90.10
  A 0.78 0.77 85.7 0 0 140.00 90.87
  Q 139.97 114.04 140.00 136.09
  Q 140.00 137.80 141.67 138.16
  Q 142.40 138.32 143.07 138.66
  C 149.58 141.99 150.79 150.13 146.77 155.80
  C 143.69 160.15 133.34 160.53 129.97 156.48
  Q 125.71 151.34 127.41 144.93
  C 128.27 141.66 130.25 139.20 133.70 138.67
  Z"
/>
<ellipse fill="#17181a" cx="0.00" cy="0.00" transform="translate(174.21,74.59) rotate(-3.0)" rx="7.16" ry="6.72"/>
<path fill="#17181a" d="
  M 224.39 116.90
  Q 218.12 113.84 217.00 106.18
  C 215.58 96.39 226.13 85.60 236.21 88.70
  C 244.71 91.32 250.01 99.00 247.39 107.81
  Q 244.38 117.98 232.80 119.06
  C 229.54 119.36 227.22 118.28 224.39 116.90
  Z"
/>
<circle fill="#17181a" cx="176.20" cy="108.96" r="14.17"/>
<path fill="#17181a" d="
  M 184.79 150.61
  A 0.82 0.82 0.0 0 0 183.99 149.98
  L 161.29 150.01
  Q 160.06 150.01 160.01 148.79
  L 159.91 146.28
  A 1.15 1.15 0.0 0 1 161.06 145.08
  L 182.45 144.98
  Q 184.14 144.98 185.16 143.62
  C 187.96 139.86 191.36 137.11 196.28 137.99
  C 199.47 138.57 204.50 142.64 205.04 145.98
  C 205.79 150.60 204.66 154.44 200.51 157.16
  C 194.87 160.85 189.55 159.21 185.68 154.04
  C 184.88 152.97 185.07 151.83 184.79 150.61
  Z"
/>
<path fill="#17181a" d="
  M 206.88 236.67
  C 204.15 233.99 199.70 233.92 196.14 233.94
  Q 172.55 234.02 145.65 234.04
  C 141.94 234.04 139.06 232.69 139.04 228.51
  Q 138.95 208.18 139.02 191.26
  C 139.03 186.59 144.51 185.09 148.50 185.08
  Q 169.91 185.02 191.75 184.80
  C 194.02 184.78 196.23 184.96 198.16 186.34
  Q 201.25 188.52 203.19 190.52
  Q 213.81 201.45 224.59 212.20
  C 226.76 214.37 230.36 217.98 234.16 217.98
  Q 284.81 217.98 337.65 218.04
  Q 341.38 218.04 343.79 216.73
  C 347.28 214.83 352.02 210.76 352.01 206.44
  Q 352.00 179.83 351.99 148.98
  Q 351.99 146.84 352.80 144.97
  Q 353.02 144.48 353.50 144.27
  Q 355.66 143.29 358.13 143.22
  C 362.72 143.09 366.68 142.31 370.28 145.80
  Q 376.05 151.39 381.80 156.72
  C 384.36 159.09 386.57 161.70 388.83 164.31
  C 390.35 166.06 391.08 168.10 391.07 170.41
  Q 390.93 196.39 391.12 221.62
  Q 391.16 226.16 390.77 230.89
  C 389.52 245.95 380.81 256.44 365.51 259.17
  Q 359.87 260.18 349.06 260.11
  Q 293.23 259.79 240.49 260.20
  Q 235.38 260.24 231.72 259.18
  C 227.90 258.07 223.86 254.33 221.09 251.31
  Q 214.33 243.96 206.88 236.67
  Z"
/>
<path fill="#17181a" d="
  M 231.48 149.41
  Q 225.15 149.87 219.31 150.02
  A 2.25 2.24 87.6 0 1 217.02 147.91
  L 217.00 147.59
  Q 216.86 145.04 219.41 145.04
  L 250.69 145.01
  Q 252.18 145.01 252.12 146.50
  L 252.07 147.53
  Q 252.00 148.97 250.56 148.95
  Q 240.07 148.80 231.48 149.41
  Z"
/>
<ellipse fill="#17181a" cx="0.00" cy="0.00" transform="translate(559.92,157.64) rotate(26.2)" rx="8.90" ry="8.67"/>
<ellipse fill="#17181a" cx="0.00" cy="0.00" transform="translate(594.65,157.62) rotate(14.7)" rx="9.34" ry="8.70"/>
<circle fill="#17181a" cx="311.41" cy="174.68" r="14.67"/>
<path fill="#17181a" d="
  M 236.85 193.16
  C 230.85 193.29 224.26 189.44 223.19 183.11
  C 222.21 177.33 223.12 169.84 228.29 166.33
  C 233.14 163.04 240.77 162.58 245.48 166.61
  C 249.23 169.80 252.55 174.96 251.63 180.14
  Q 250.96 183.93 248.86 186.62
  C 245.59 190.81 242.54 193.04 236.85 193.16
  Z"
/>
<ellipse fill="#17181a" cx="0.00" cy="0.00" transform="translate(274.65,186.78) rotate(-10.4)" rx="7.43" ry="7.05"/>
<ellipse fill="#17181a" cx="0.00" cy="0.00" transform="translate(484.36,190.49) rotate(-21.6)" rx="10.79" ry="10.57"/>
<path fill="#17181a" d="
  M 516.53 202.89
  C 514.79 198.03 516.52 190.12 523.37 190.08
  Q 554.35 189.93 594.07 190.03
  A 0.93 0.93 0.0 0 1 595.00 190.96
  L 595.00 207.01
  A 0.95 0.95 0.0 0 1 594.05 207.96
  Q 561.14 208.02 527.04 207.98
  C 522.27 207.98 518.63 208.76 516.53 202.89
  Z"
/>
<path fill="#17181a" d="
  M 609.81 207.96
  A 0.84 0.84 0.0 0 1 608.98 207.11
  L 609.06 191.89
  A 1.92 1.63 -89.7 0 1 610.70 189.98
  L 618.44 190.02
  A 1.92 1.63 -89.7 0 1 620.06 191.95
  L 619.98 207.17
  A 0.84 0.84 0.0 0 1 619.13 208.00
  L 609.81 207.96
  Z"
/>
<ellipse fill="#17181a" cx="0.00" cy="0.00" transform="translate(493.62,225.00) rotate(-8.5)" rx="8.66" ry="8.33"/>
<path fill="#17181a" d="
  M 553.00 591.75
  L 553.00 612.25
  A 0.75 0.75 0.0 0 1 552.25 613.00
  L 535.29 613.00
  A 0.30 0.29 1.0 0 1 535.00 612.71
  Q 534.99 592.38 534.98 572.51
  C 534.98 563.55 540.40 555.30 550.44 555.09
  Q 562.40 554.84 575.87 554.93
  C 582.27 554.98 583.92 550.79 583.92 545.25
  Q 584.01 390.13 584.00 230.94
  A 1.28 1.28 0.0 0 1 584.86 229.73
  Q 586.67 229.10 589.53 229.03
  Q 602.66 228.69 617.75 229.53
  Q 618.65 229.58 619.51 229.44
  Q 620.03 229.36 620.03 229.89
  C 619.95 244.51 619.84 258.92 620.47 273.49
  Q 621.51 297.42 620.83 318.13
  Q 620.31 333.87 619.83 349.39
  A 0.62 0.61 0.5 0 1 619.21 349.99
  L 610.12 350.01
  A 2.12 2.12 0.0 0 0 608.00 352.13
  L 608.00 380.75
  A 2.26 2.25 0.1 0 0 610.25 383.00
  L 619.44 383.01
  A 0.64 0.64 0.0 0 1 620.08 383.66
  Q 619.80 455.69 620.15 538.52
  Q 620.19 548.50 619.34 553.53
  C 616.40 570.86 604.62 585.47 587.28 589.98
  Q 582.26 591.28 570.56 591.07
  Q 562.23 590.93 553.73 591.01
  Q 553.00 591.02 553.00 591.75
  Z"
/>
<rect fill="#17181a" x="-8.48" y="-8.02" transform="translate(555.50,238.01) rotate(-5.9)" width="16.96" height="16.04" rx="7.35"/>
<circle fill="#17181a" cx="517.16" cy="284.73" r="32.30"/>
<path fill="#17181a" d="
  M 213.36 302.13
  C 212.19 308.92 210.96 314.21 206.92 319.82
  Q 195.96 335.05 177.78 335.70
  Q 175.03 335.79 172.41 335.41
  C 170.09 335.07 167.79 335.10 165.51 334.39
  C 155.73 331.35 148.26 323.92 143.70 314.81
  Q 140.74 308.91 140.53 301.14
  Q 140.18 287.60 147.91 277.06
  Q 154.37 268.26 162.84 265.01
  Q 172.94 261.15 183.95 263.31
  Q 190.27 264.55 197.85 269.46
  C 206.53 275.09 212.44 285.62 213.52 295.43
  A 1.60 1.59 88.5 0 0 215.01 296.85
  Q 224.43 297.39 234.21 296.88
  A 1.50 1.48 9.7 0 0 235.51 295.97
  C 237.80 290.58 243.83 287.52 249.35 289.90
  C 253.66 291.76 257.34 296.52 255.70 301.44
  C 254.83 304.05 253.46 307.05 250.67 308.09
  Q 244.51 310.38 239.28 307.28
  C 237.21 306.05 236.40 304.08 235.49 302.00
  A 1.75 1.75 0.0 0 0 233.89 300.96
  L 214.77 300.94
  A 1.44 1.43 -85.0 0 0 213.36 302.13
  Z
  M 171.6496 314.1327
  A 15.53 15.20 108.9 0 0 191.0605 304.3635
  A 15.53 15.20 108.9 0 0 181.7104 284.7473
  A 15.53 15.20 108.9 0 0 162.2995 294.5165
  A 15.53 15.20 108.9 0 0 171.6496 314.1327
  Z"
/>
<path fill="#17181a" d="
  M 343.93 304.22
  C 343.69 307.48 340.21 309.01 337.34 309.01
  Q 310.41 308.99 280.02 309.01
  Q 278.37 309.01 277.19 307.90
  C 273.53 304.48 274.82 295.89 276.41 292.12
  C 277.08 290.55 278.71 290.02 280.28 290.02
  Q 309.48 289.99 338.76 289.99
  Q 341.00 289.99 343.09 290.77
  Q 343.57 290.95 343.77 291.43
  Q 344.41 292.98 344.38 294.62
  Q 344.30 299.17 343.93 304.22
  Z"
/>
<ellipse fill="#17181a" cx="0.00" cy="0.00" transform="translate(474.13,338.24) rotate(116.9)" rx="9.55" ry="9.17"/>
<path fill="#17181a" d="
  M 13.75 475.23
  A 1.73 1.73 0.0 0 1 12.00 473.50
  L 12.00 330.75
  A 0.75 0.75 0.0 0 1 12.75 330.00
  L 44.81 330.00
  Q 45.92 330.00 46.57 330.90
  C 47.60 332.30 47.98 334.29 47.98 336.01
  Q 48.02 409.07 48.02 469.16
  Q 48.02 471.22 47.34 473.95
  A 1.31 1.30 -83.0 0 1 46.09 474.93
  L 13.75 475.23
  Z"
/>
<path fill="#17181a" d="
  M 104.01 367.77
  A 0.76 0.76 0.0 0 0 104.77 368.53
  L 212.76 368.55
  Q 213.75 368.55 213.75 367.56
  Q 213.70 359.47 213.64 351.34
  Q 213.63 348.91 215.21 346.77
  Q 218.90 341.77 225.69 343.07
  Q 232.60 344.40 232.61 353.12
  Q 232.66 397.66 232.58 445.11
  C 232.57 447.10 231.59 448.20 230.60 449.72
  A 1.82 1.82 0.0 0 1 229.64 450.46
  C 227.68 451.12 225.81 451.70 223.69 451.70
  Q 194.18 451.72 162.83 451.72
  A 1.82 1.82 0.0 0 0 161.01 453.54
  L 161.01 504.49
  Q 161.01 506.44 162.96 506.45
  Q 191.58 506.60 225.12 506.39
  Q 227.06 506.38 228.59 507.42
  Q 232.62 510.15 232.79 515.20
  C 233.02 521.87 229.19 525.37 222.86 525.37
  Q 194.95 525.40 157.16 525.33
  C 146.49 525.31 141.97 516.84 141.95 507.37
  Q 141.90 476.10 142.00 449.99
  C 142.03 440.77 146.45 431.72 156.58 431.73
  Q 185.56 431.77 209.87 431.76
  A 3.83 3.82 -90.0 0 0 213.69 427.93
  L 213.70 389.97
  A 2.48 2.48 0.0 0 0 211.23 387.49
  Q 165.06 387.32 120.00 387.43
  Q 118.24 387.43 117.15 388.64
  Q 110.09 396.50 106.34 399.55
  C 98.34 406.04 87.58 404.33 78.14 404.37
  C 73.69 404.40 69.16 404.96 69.18 398.57
  Q 69.26 370.10 69.27 343.17
  Q 69.28 339.05 73.40 339.04
  Q 83.77 339.01 94.12 339.01
  C 97.40 339.01 99.95 337.37 103.16 338.89
  A 1.50 1.48 -77.6 0 1 104.01 340.24
  L 104.01 367.77
  Z"
/>
<path fill="#17181a" d="
  M 506.43 360.30
  A 1.79 1.76 68.4 0 0 506.97 359.02
  L 507.01 341.97
  Q 507.01 340.96 508.03 340.97
  L 524.21 341.02
  A 0.80 0.80 0.0 0 1 525.01 341.83
  Q 524.88 354.97 525.19 366.01
  Q 525.42 373.94 523.74 381.31
  Q 522.94 384.81 520.06 388.48
  Q 512.57 398.00 500.75 398.82
  Q 492.74 399.38 484.82 398.89
  A 1.89 1.89 0.0 0 1 483.04 397.01
  Q 482.95 380.72 483.02 364.58
  C 483.03 361.76 485.99 361.13 488.14 361.08
  Q 496.16 360.92 504.67 361.02
  Q 505.69 361.03 506.43 360.30
  Z"
/>
<path fill="#17181a" d="
  M 270.56 407.38
  L 246.01 407.38
  Q 245.48 407.38 245.23 406.91
  Q 244.50 405.54 243.04 405.46
  Q 242.50 405.42 242.62 404.89
  Q 242.89 403.63 242.05 402.69
  Q 241.72 402.32 241.72 401.83
  Q 241.71 380.37 241.74 359.55
  C 241.75 358.25 242.40 357.23 242.47 356.03
  Q 242.64 353.00 242.52 349.86
  C 242.40 346.48 243.60 343.62 247.41 343.61
  Q 262.84 343.61 278.74 343.62
  Q 280.05 343.62 281.39 343.48
  Q 281.85 343.43 282.23 343.17
  C 284.02 341.94 285.34 343.50 287.14 343.68
  Q 287.64 343.72 287.99 344.07
  L 290.42 346.51
  Q 290.71 346.79 290.71 347.20
  L 290.71 505.06
  A 2.17 2.16 0.0 0 0 292.88 507.22
  Q 311.52 507.24 329.06 507.18
  Q 332.42 507.17 334.85 510.32
  Q 335.05 510.58 335.00 510.93
  Q 334.92 511.42 335.32 511.73
  Q 336.15 512.35 336.02 513.38
  Q 335.95 513.95 336.31 514.40
  Q 336.70 514.90 336.89 515.54
  Q 337.01 515.91 336.89 516.29
  Q 336.01 519.17 334.95 521.23
  Q 334.11 522.87 332.10 524.40
  Q 331.65 524.74 331.09 524.72
  Q 330.15 524.69 329.48 525.34
  Q 329.07 525.73 328.50 525.73
  L 280.03 525.73
  Q 279.53 525.73 279.08 525.51
  L 275.39 523.68
  A 2.61 2.58 2.2 0 1 274.17 522.38
  Q 273.62 521.08 272.57 520.06
  A 1.45 1.44 27.0 0 1 272.16 518.82
  Q 272.30 517.91 271.61 517.29
  A 1.11 1.11 0.0 0 1 271.25 516.47
  L 271.25 408.06
  Q 271.25 407.38 270.56 407.38
  Z"
/>
<ellipse fill="#17181a" cx="0.00" cy="0.00" transform="translate(550.56,367.20) rotate(-31.4)" rx="8.44" ry="8.23"/>
<path fill="#17181a" d="
  M 455.96 390.03
  C 455.85 393.92 455.51 398.83 450.40 398.86
  Q 407.40 399.09 375.00 398.95
  Q 372.41 398.94 370.09 397.79
  Q 369.59 397.55 369.43 397.02
  Q 368.10 392.64 368.03 387.74
  Q 367.89 377.07 368.12 367.23
  C 368.26 361.13 372.71 360.95 377.45 360.96
  Q 414.25 360.99 447.96 361.01
  C 449.80 361.01 452.07 361.34 453.82 361.90
  Q 455.75 362.51 455.87 365.24
  Q 456.37 376.51 455.96 390.03
  Z"
/>
<ellipse fill="#17181a" cx="0.00" cy="0.00" transform="translate(550.92,400.59) rotate(-11.9)" rx="8.13" ry="7.84"/>
<path fill="#17181a" d="
  M 87.76 448.99
  A 0.75 0.75 0.0 0 0 87.01 449.74
  L 87.00 464.52
  Q 86.99 466.92 89.40 466.96
  Q 100.41 467.10 111.86 466.91
  C 122.09 466.74 131.68 468.29 134.35 479.06
  Q 135.25 482.68 135.09 488.76
  Q 134.84 498.31 135.08 506.98
  C 135.30 514.63 134.15 520.53 127.21 524.91
  Q 124.44 526.66 116.54 527.44
  Q 110.55 528.03 104.62 528.07
  A 0.62 0.62 0.0 0 0 104.00 528.69
  L 104.00 611.99
  A 1.00 1.00 0.0 0 1 103.00 612.99
  L 86.50 613.00
  A 0.50 0.50 0.0 0 1 86.00 612.50
  L 86.00 529.48
  Q 86.00 527.30 83.83 527.17
  C 79.92 526.94 74.08 527.83 70.70 525.95
  C 64.55 522.52 64.53 513.86 69.28 509.41
  C 70.94 507.87 72.86 506.96 75.18 506.96
  Q 93.49 506.90 111.78 506.91
  Q 113.99 506.91 114.00 504.70
  L 114.02 489.21
  A 1.21 1.21 0.0 0 0 112.80 488.00
  Q 98.53 488.12 83.78 488.04
  C 76.04 488.00 68.65 484.34 67.07 476.22
  Q 65.78 469.58 66.08 462.25
  Q 66.55 451.04 67.18 440.71
  C 67.53 434.91 72.95 429.84 78.36 428.51
  Q 80.78 427.92 83.78 427.93
  Q 103.57 428.03 123.14 427.98
  C 138.23 427.94 139.10 449.06 123.09 449.05
  Q 104.71 449.04 87.76 448.99
  Z"
/>
<path fill="#17181a" d="
  M 243.21 428.64
  Q 243.27 428.41 243.56 428.30
  Q 243.68 428.25 243.81 428.25
  L 252.24 428.25
  Q 252.83 428.25 253.14 428.77
  Q 253.47 429.32 254.09 429.26
  Q 254.74 429.19 255.15 429.70
  C 255.93 430.64 256.73 431.10 257.18 432.31
  Q 257.85 434.08 258.85 435.57
  Q 259.13 435.99 259.13 436.50
  L 259.13 518.88
  Q 259.13 519.33 258.93 519.73
  L 256.46 524.53
  Q 256.24 524.96 255.77 525.08
  Q 254.17 525.46 253.21 526.70
  A 1.30 1.28 19.2 0 1 252.14 527.21
  Q 249.98 527.13 247.72 527.27
  Q 245.02 527.44 243.09 526.30
  C 240.74 524.90 238.67 522.43 238.10 519.68
  C 237.85 518.46 237.16 517.64 237.16 516.36
  Q 237.16 481.39 237.17 447.92
  Q 237.17 447.52 237.51 447.31
  L 237.81 447.14
  Q 238.16 446.93 238.16 446.51
  L 238.15 434.20
  Q 238.15 433.65 238.59 433.31
  Q 239.06 432.95 239.15 432.35
  Q 239.23 431.79 239.55 431.30
  Q 240.81 429.43 242.63 429.18
  Q 243.10 429.11 243.21 428.64
  Z"
/>
<path fill="#17181a" d="
  M 364.52 521.94
  Q 362.07 528.86 354.12 528.55
  Q 347.40 528.28 344.98 522.80
  Q 344.31 521.27 343.74 519.62
  Q 343.26 518.22 343.26 516.69
  Q 343.30 484.34 343.29 451.38
  C 343.29 449.47 344.08 447.97 344.14 446.35
  Q 344.31 441.69 344.28 437.30
  C 344.24 432.38 347.97 429.35 352.74 429.40
  Q 355.28 429.42 357.70 429.56
  C 362.25 429.82 365.29 435.46 365.29 439.61
  Q 365.27 480.30 365.28 520.38
  Q 365.28 520.78 365.08 521.12
  Q 365.00 521.26 364.88 521.38
  Q 364.64 521.61 364.52 521.94
  Z"
/>
<path fill="#17181a" d="
  M 473.54 442.06
  C 473.68 442.73 473.70 443.27 473.40 443.91
  Q 470.84 449.30 467.94 454.60
  Q 467.67 455.10 467.81 455.66
  Q 468.05 456.65 467.16 457.10
  Q 466.75 457.31 466.81 457.77
  L 466.87 458.18
  Q 466.94 458.73 466.42 458.92
  Q 465.65 459.22 465.84 459.99
  Q 466.00 460.60 465.43 460.86
  Q 464.74 461.19 464.85 461.95
  Q 464.93 462.55 464.42 462.89
  Q 463.62 463.41 463.86 464.36
  Q 464.02 464.99 463.64 465.52
  Q 462.58 466.99 462.10 468.61
  Q 461.45 470.82 460.93 471.77
  Q 459.48 474.44 458.08 477.28
  Q 457.95 477.55 457.99 478.01
  A 1.61 1.55 -34.9 0 1 457.82 478.87
  Q 455.68 483.16 453.45 487.50
  Q 453.06 488.24 453.19 489.12
  Q 453.27 489.75 452.71 490.05
  Q 452.07 490.38 452.19 491.08
  Q 452.29 491.72 451.71 492.02
  Q 451.03 492.37 451.20 493.12
  Q 451.34 493.75 450.75 494.02
  Q 449.98 494.36 450.19 495.16
  Q 450.35 495.79 449.74 496.00
  Q 449.58 496.06 449.46 496.17
  A 0.81 0.81 0.0 0 0 449.21 496.88
  Q 449.31 497.60 448.71 497.99
  Q 448.08 498.39 448.23 499.12
  Q 448.31 499.54 447.95 499.77
  Q 447.04 500.35 447.34 501.39
  Q 447.50 501.96 447.12 502.39
  Q 446.75 502.80 446.53 503.29
  Q 445.30 505.98 443.94 508.70
  C 443.40 509.76 443.30 510.86 442.74 511.98
  Q 440.73 516.00 438.70 520.21
  Q 438.22 521.22 437.38 522.01
  C 436.47 522.86 435.85 523.68 434.65 524.19
  Q 431.89 525.38 429.42 526.86
  A 1.40 1.38 31.4 0 1 428.57 527.06
  Q 426.95 526.91 425.30 527.46
  Q 424.29 527.79 423.23 527.60
  Q 418.44 526.74 415.03 525.07
  Q 413.70 524.42 412.76 523.01
  C 410.50 519.66 408.36 516.29 406.81 512.53
  Q 403.65 504.84 400.28 498.15
  Q 400.16 497.90 399.95 497.71
  Q 399.57 497.36 399.71 496.85
  Q 399.88 496.22 399.26 496.03
  Q 398.53 495.79 398.76 495.06
  Q 398.95 494.42 398.37 494.09
  Q 397.26 493.47 397.78 492.33
  Q 398.12 491.57 397.37 491.21
  Q 396.59 490.83 396.78 490.00
  Q 396.91 489.43 396.37 489.19
  Q 395.59 488.84 395.78 487.98
  A 0.67 0.66 17.2 0 0 395.37 487.21
  Q 394.85 487.02 394.85 486.46
  Q 394.84 486.04 394.64 485.68
  Q 393.38 483.45 392.28 481.10
  Q 391.99 480.48 391.94 479.76
  Q 391.92 479.30 391.71 478.90
  Q 389.46 474.48 387.23 470.13
  C 386.87 469.43 387.19 468.93 386.85 468.30
  Q 385.25 465.37 383.87 462.28
  Q 383.73 461.96 383.46 461.74
  Q 383.05 461.40 383.15 460.90
  Q 383.25 460.34 382.77 460.04
  Q 381.74 459.38 382.21 458.22
  A 0.87 0.87 0.0 0 0 381.76 457.11
  Q 381.03 456.77 381.19 455.97
  A 0.71 0.69 21.7 0 0 380.86 455.23
  Q 380.41 454.97 380.29 454.47
  Q 380.18 454.01 379.95 453.58
  Q 376.73 447.60 374.43 441.03
  C 373.75 439.09 373.98 435.53 375.42 433.99
  Q 377.30 432.00 379.83 430.96
  Q 380.31 430.76 380.83 430.80
  Q 382.43 430.95 383.48 429.95
  A 0.80 0.78 27.1 0 1 384.15 429.74
  Q 384.81 429.84 385.21 430.39
  Q 385.51 430.79 386.01 430.79
  L 388.07 430.77
  Q 388.70 430.77 389.03 431.31
  Q 389.32 431.78 389.91 431.76
  Q 390.46 431.73 390.86 432.11
  Q 393.51 434.64 395.49 438.05
  C 395.94 438.81 395.71 439.43 396.27 440.22
  Q 397.09 441.36 397.82 442.95
  Q 403.53 455.31 409.56 468.50
  Q 413.57 477.25 417.15 485.08
  Q 417.87 486.65 418.35 488.18
  Q 418.89 489.93 419.84 491.41
  Q 420.09 491.78 420.08 492.23
  Q 420.07 492.73 420.48 493.00
  Q 420.91 493.28 420.97 493.80
  Q 421.24 495.98 422.60 497.94
  Q 422.89 498.36 423.02 498.85
  Q 423.35 500.18 424.64 500.87
  Q 425.33 501.24 425.65 500.53
  L 427.16 497.29
  Q 427.31 496.95 427.60 496.72
  Q 428.02 496.36 427.86 495.84
  A 0.62 0.61 -18.7 0 1 428.25 495.07
  Q 429.13 494.75 428.85 493.87
  Q 428.67 493.29 429.24 493.08
  Q 430.02 492.79 429.81 491.98
  A 0.73 0.72 68.6 0 1 430.17 491.15
  Q 431.20 490.61 430.78 489.51
  Q 430.58 488.98 430.94 488.54
  Q 431.75 487.56 432.27 486.29
  Q 437.56 473.42 443.46 460.83
  Q 444.77 458.04 446.05 454.92
  Q 447.30 451.86 448.91 449.06
  Q 449.13 448.67 449.17 448.22
  Q 449.27 447.26 449.70 446.38
  Q 451.39 442.94 452.93 440.07
  Q 453.15 439.67 453.16 439.21
  Q 453.17 438.81 453.17 438.43
  A 1.01 1.00 -17.2 0 1 453.61 437.60
  Q 454.80 436.78 455.16 435.44
  A 1.68 1.62 -16.3 0 1 455.57 434.72
  L 458.21 432.06
  A 1.27 1.25 33.5 0 1 459.58 431.79
  Q 460.40 432.12 460.85 431.40
  Q 461.22 430.77 461.95 430.78
  L 468.00 430.78
  Q 468.48 430.78 468.67 431.23
  Q 468.96 431.91 469.71 431.77
  Q 470.33 431.65 470.62 432.21
  Q 470.93 432.81 471.62 432.79
  Q 472.23 432.78 472.71 433.17
  Q 473.56 433.87 473.70 434.96
  A 0.82 0.82 0.0 0 0 474.01 435.51
  L 474.27 435.71
  Q 474.55 435.93 474.55 436.28
  L 474.55 440.78
  Q 474.55 441.31 474.07 441.54
  Q 473.94 441.60 473.80 441.64
  Q 473.48 441.73 473.54 442.06
  Z"
/>
<path fill="#17181a" d="
  M 510.53 451.79
  L 510.53 468.26
  A 0.48 0.48 0.0 0 0 511.01 468.74
  L 555.51 468.74
  Q 556.04 468.74 556.27 469.21
  Q 556.55 469.77 557.18 469.70
  Q 557.81 469.62 558.21 470.11
  Q 558.62 470.62 559.29 470.70
  Q 559.72 470.76 560.04 471.07
  L 562.69 473.73
  A 1.20 1.19 -64.3 0 1 563.02 474.69
  Q 562.89 475.79 563.60 476.60
  Q 563.98 477.03 564.00 477.60
  C 564.03 478.81 564.19 479.92 563.68 481.08
  Q 562.59 483.54 561.21 485.81
  Q 560.93 486.28 560.38 486.18
  Q 559.56 486.03 559.17 486.77
  Q 558.92 487.25 558.39 487.16
  Q 557.63 487.03 557.20 487.66
  Q 556.86 488.17 556.26 488.17
  L 553.01 488.18
  Q 552.45 488.19 552.24 488.70
  Q 552.15 488.91 551.95 489.01
  Q 551.73 489.11 551.50 489.11
  Q 531.15 489.14 511.08 489.14
  Q 510.53 489.14 510.53 489.69
  L 510.53 505.45
  A 2.18 2.17 -90.0 0 0 512.70 507.63
  L 567.04 507.62
  Q 567.64 507.62 567.92 508.15
  Q 568.18 508.65 568.75 508.52
  Q 569.32 508.38 569.75 508.78
  Q 571.53 510.45 572.55 512.82
  Q 572.96 513.77 572.74 514.77
  Q 572.49 515.92 573.46 516.53
  Q 573.86 516.78 573.50 517.08
  Q 572.38 518.04 572.81 519.61
  Q 573.00 520.31 572.56 520.88
  C 571.81 521.83 571.87 522.88 570.92 523.72
  Q 569.09 525.32 566.68 526.36
  Q 565.08 527.05 563.38 527.05
  Q 531.90 527.02 501.04 527.04
  Q 500.47 527.04 500.03 526.70
  Q 499.28 526.12 498.29 526.13
  Q 497.75 526.13 497.32 525.81
  Q 493.55 523.03 491.32 519.05
  Q 491.03 518.54 491.09 517.96
  Q 491.26 516.38 490.44 515.08
  Q 490.10 514.54 490.10 513.91
  Q 490.12 479.61 490.12 445.41
  Q 490.12 444.98 490.35 444.61
  Q 490.46 444.45 490.62 444.34
  Q 491.08 444.04 491.07 443.49
  L 491.06 439.82
  A 1.61 1.52 -32.0 0 1 491.26 439.06
  Q 492.39 437.06 493.38 434.90
  Q 493.89 433.77 495.04 433.67
  A 1.71 1.68 -67.4 0 0 495.98 433.27
  Q 496.55 432.78 496.93 432.15
  Q 497.24 431.64 497.81 431.77
  Q 498.57 431.95 498.90 431.29
  Q 499.15 430.78 499.72 430.78
  L 563.71 430.78
  Q 564.29 430.78 564.78 431.09
  Q 565.70 431.66 566.75 431.76
  Q 567.27 431.80 567.68 432.13
  Q 571.57 435.17 572.44 437.93
  Q 573.02 439.79 572.85 442.80
  C 572.64 446.26 569.62 449.90 566.20 450.39
  C 565.10 450.56 564.73 451.23 563.54 451.23
  Q 538.78 451.21 511.09 451.22
  A 0.57 0.56 -90.0 0 0 510.53 451.79
  Z"
/>
<path fill="#17181a" d="
  M 44.97 591.41
  Q 37.52 588.70 29.48 582.48
  C 20.96 575.87 15.23 566.84 13.05 556.69
  Q 11.85 551.12 11.92 541.23
  Q 12.10 515.31 11.96 490.61
  A 0.61 0.60 90.0 0 1 12.56 490.00
  L 46.05 490.00
  A 0.95 0.95 0.0 0 1 46.99 490.82
  Q 47.43 494.13 47.39 497.67
  Q 47.36 501.09 47.63 503.81
  Q 47.93 506.87 47.97 509.69
  Q 48.07 519.67 47.96 545.26
  C 47.93 552.67 54.97 555.66 60.07 559.18
  C 62.62 560.94 63.05 563.17 63.04 566.19
  Q 63.01 584.43 63.28 603.00
  Q 63.34 607.20 63.94 611.96
  A 0.92 0.92 0.0 0 1 63.03 612.99
  L 46.76 613.00
  Q 46.12 613.00 46.12 612.37
  L 45.98 592.82
  Q 45.97 591.77 44.97 591.41
  Z"
/>
<path fill="#17181a" d="
  M 304.80 591.45
  A 1.07 1.07 0.0 0 0 303.92 590.99
  Q 215.06 591.03 129.83 590.98
  Q 128.22 590.98 126.63 590.82
  A 1.80 1.79 3.0 0 1 125.02 589.04
  Q 125.00 579.94 124.96 569.84
  C 124.93 562.04 129.19 554.98 137.91 554.98
  Q 238.89 555.03 336.41 554.98
  C 339.68 554.98 345.48 555.76 345.86 560.11
  Q 346.45 566.72 345.98 573.33
  A 0.71 0.71 0.0 0 1 345.27 574.00
  L 324.00 574.00
  A 2.00 2.00 0.0 0 0 322.00 576.01
  L 322.01 583.25
  Q 322.01 585.99 324.75 585.99
  L 345.25 586.01
  A 0.75 0.74 -0.0 0 1 346.00 586.75
  L 346.00 612.25
  A 0.75 0.75 0.0 0 1 345.25 613.00
  L 305.28 613.00
  A 0.28 0.27 90.0 0 1 305.01 612.72
  Q 304.99 602.52 304.99 592.25
  Q 304.99 591.73 304.80 591.45
  Z"
/>
<path fill="#17181a" d="
  M 505.81 555.73
  C 512.77 558.92 514.25 564.02 514.22 571.12
  Q 514.18 580.72 513.93 589.13
  A 1.90 1.90 0.0 0 1 512.03 590.98
  Q 443.73 591.01 375.50 591.01
  C 372.71 591.01 369.18 591.14 369.13 587.50
  Q 368.93 573.86 369.03 558.73
  A 3.73 3.73 0.0 0 1 372.76 555.02
  Q 437.81 554.99 502.47 554.99
  Q 504.20 554.99 505.81 555.73
  Z"
/>


    </svg>
  );
};

export default Logo;
