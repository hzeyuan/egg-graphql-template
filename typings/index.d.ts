
export interface Router {
    name: string;
    url: string;
    methods: string;
}

export interface templateConfig {
    router: {
        rest: Router[],
    },
}