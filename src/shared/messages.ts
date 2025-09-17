export interface Message {
    sender: {
        name: string,
        email: string,
    },
    receiver: {
        name: string,
        email: string,
    },
    date: string,
    subject: string,
    content: string,
    company: string,
    status: string,
}

export const statuses = [
    { value: 'to_validate', label: 'To do', color: 'orange' },
    { value: 'ongoing', label: 'Ongoing', color: 'sky' },
    { value: 'done', label: 'Done', color: 'green' },
    { value: 'vip', label: 'Priority', color: 'purple' },
] as const
