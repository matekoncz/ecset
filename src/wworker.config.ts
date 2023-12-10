export let generatedServiceWorkerUrl =
(function generateUrl(): string{
    // Override the real Worker with a stub
    // to return the filename, which will be generated/replaced by the worker-plugin.
    // @ts-ignore
    Worker = class WorkerStub {
        constructor(public stringUrl: string, public options?: WorkerOptions) {}
    };

    // const worker = new Worker(new URL("./service-worker.worker", import.meta.url), { type: "module" }) as any;
    const worker = new Worker(new URL("./wworker.worker", import.meta.url), { type: "module" }) as any;
    return worker.stringUrl;
})();

export const serviceWorkerConfig = {
    serviceWorkerUrl: generatedServiceWorkerUrl
};