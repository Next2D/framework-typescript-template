import { ConfigImpl } from "@next2d/framework/dist/interface/ConfigImpl";
const config: ConfigImpl = {
    "platform": "web",
    "stage": {
        "width": 240,
        "height": 240,
        "fps": 12,
        "options": {
            "base": ".",
            "fullScreen": true
        }
    },
    "routing": {
        "@sample": {
            "requests": [
                {
                    "type": "content",
                    "path": "{{ content.endPoint }}content/sample.json",
                    "name": "MainContent",
                    "cache": true
                }
            ]
        },
        "top": {
            "requests": [
                {
                    "type": "cluster",
                    "path": "@sample"
                },
                {
                    "type": "json",
                    "path": "{{ api.endPoint }}api/top.json",
                    "name": "TopText"
                }
            ]
        },
        "home": {
            "requests": [
                {
                    "type": "cluster",
                    "path": "@sample"
                },
                {
                    "type": "custom",
                    "class": "infrastructure.repository.HomeTextRepository",
                    "access": "static",
                    "method": "get",
                    "name": "HomeText",
                    "cache": true
                }
            ]
        }
    },
    "api": {
        "endPoint": "/"
    },
    "content": {
        "endPoint": "/"
    },
    "spa": true,
    "loading": {
        "callback": "Loading"
    },
    "gotoView": {
        "callback": [
            "domain.callback.Background"
        ]
    }
};
export { config };