

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
};

export default cssTheme;