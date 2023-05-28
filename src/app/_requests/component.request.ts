export class FindComponentRequest {
    id: string;
}

export class AddComponentRequest {
    label: string;
    category: string;
    content: string;
}

export class UpdateComponentRequest {
    id: string;
    label: string;
    category: string;
    content: string;
}

export class DeleteComponentRequest {
    id: string;
}