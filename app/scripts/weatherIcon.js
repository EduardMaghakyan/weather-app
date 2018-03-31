class WeatherIcon extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["weather"];
    }

    connectedCallback() {
        this.setupElements();
    }

    get weather() {
        return this.getAttribute("weather");
    }

    set weather(val) {
        this.setAttribute("weather", val);
    }

    setupElements() {
        const icon = document.createElement("img");
        icon.src = `/public/img/${this.getAttribute(
            "weather"
        ).toLowerCase()}.png`;
        icon.style = "-webkit-filter: invert(1);filter: invert(1);";
        this.shadow.appendChild(icon);
    }
}

customElements.define("weather-icon", WeatherIcon);
