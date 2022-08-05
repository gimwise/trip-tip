const size = {
    mobile : "767px",
    tabletMin : "768px",
    tabletMax : "1199px",
    desktop : "1200px",
};

const cssTheme = {
    // 반응형 사이즈
    mobile : `(max-width : ${size.mobile})`,
    tabletMin : `(min-width : ${size.tabletMin})`,
    tabletMax : `(max-width : ${size.tabletMax})`,
    desktop : `(min-width : ${size.desktop})`,

    // 색상
    DarkBlue : `#001E6C`,
    Blue : `#0065FF`,

    // 폰트 사이즈
    h1 : `32px`,
    h2 : `24px`,
    h3 : `16px`,
    h4 : `14px`,
};

export default cssTheme;