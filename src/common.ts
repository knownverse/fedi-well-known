export class WellKnowResult {
    success: boolean;
    data: any;
    error: string | null;

    constructor(success: boolean, data: any, error: string | null) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    static Success(data: any): WellKnowResult {
        return new WellKnowResult(true, data, null);
    }

    static Error(error: string): WellKnowResult {
        return new WellKnowResult(false, null, error);
    }
}

export async function fetchJSON(url: string): Promise<WellKnowResult> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return WellKnowResult.Error(`HTTP error! status: ${url}: ${response.status}`);
        }
        const data = await response.json();
        return WellKnowResult.Success(data);
    } catch (err: any) {
        return WellKnowResult.Error(`Error fetching url ${url}: ${err.cause || err.message}. Stack: \n ${err.stack}`);
    }
}