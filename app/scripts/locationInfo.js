class LocationInfo extends HTMLElement {
    constructor() {
        super();
        const data = this.getAttribute("data");
        this.data = data;
    }

    connectedCallback() {
        this.setupElements();
    }

    setupElements() {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");
        const info = document.createElement("span");
        info.innerHTML = this.data.city + ", " + this.data.country;
        info.style =
            "display: block;width: 50%;margin-left: auto;margin-right: auto;";

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(wrapper);
        wrapper.appendChild(info);
    }
}

customElements.define("location-info", LocationInfo);
