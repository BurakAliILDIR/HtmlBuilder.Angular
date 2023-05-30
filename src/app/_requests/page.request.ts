export class FindPageRequest {
    id: string;
}

export class AddPageRequest {
    name: string;
    route: string;
}

export class UpdatePageRequest {
    id: string;
    html: string;
    css: string;
}

export class DeletePageRequest {
    id: string;
}