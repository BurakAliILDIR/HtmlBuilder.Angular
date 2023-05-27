export class FindPageRequest {
    id: string;
}

export class AddPageRequest {
    name: string;
}

export class UpdatePageRequest {
    id: string;
    html: string;
    css: string;
}

export class DeletePageRequest {
    id: string;
}