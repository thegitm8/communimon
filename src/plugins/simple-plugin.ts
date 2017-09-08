import ServiceChassis, { Plugin, Callback } from '../service-chassis';

export interface Param {}

export class SimplePlugin extends Plugin<Param> {

    public listen(param: Param, endpoint: ServiceChassis<Param>, cb: Callback<Param>): void {
        process.stdin.on('data', stuff => {
            endpoint.bounded.forEach( bound => bound(stuff));
        });

        process.stdin.on('close', () => {
            process.exit(9001);
        });

        cb(endpoint);
    }

    public connect(param: Param, endpoint: ServiceChassis<Param>, cb: Callback<Param>): void {
        cb(endpoint);
    }

    public close(param: Param, endpoint: ServiceChassis<Param>, cb: Callback<Param>): void {
        cb(endpoint);
    }

    public read(data: any, param: Param, endpoint: ServiceChassis<Param>, cb: Callback<Param>): void {
       process.stdout.write(data, 'utf8');
    }
}

export default SimplePlugin;
