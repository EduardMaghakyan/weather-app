class TempHolder extends HTMLElement {
    constructor() {
        super();
        this.temp = this.getAttribute("temp");
        this.isCelsius = this.getAttribute("isCelsius");
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.setupElements();
    }

    celsisuToFarenheit(temp) {
        return (temp * (9 / 5) + 32).toFixed(2);
    }

    farenheitToCelsius(temp) {
        return ((temp - 32) * (5 / 9)).toFixed(2);
    }

    toggleFormat(node) {
        if (this.isCelsius) {
            this.temp = this.celsisuToFarenheit(this.temp);
        } else {
            this.temp = this.farenheitToCelsius(this.temp);
        }
        this.isCelsius = !this.isCelsius;
        node.innerHTML = this.getFormattedDegree();
    }

    getFormattedDegree() {
        return this.temp + (this.isCelsius ? " &#8451;" : " &#8457;");
    }

    setupElements() {
        const format = document.createElement("span");
        format.style =
            "display: block;width: 50%;margin-left: auto;margin-right: auto;";
        format.innerHTML = this.getFormattedDegree();
        format.addEventListener("click", () => {
            this.toggleFormat(format);
        });
        this.shadow.appendChild(format);
    }
}

customElements.define("temp-holder", TempHolder);
