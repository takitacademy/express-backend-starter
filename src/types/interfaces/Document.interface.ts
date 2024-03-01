export interface IDocuments {
    userId: string
    nationalId?: string
    nationalIdVerified?: boolean
    maritalStatus?: string
    maritalStatusVerified?: boolean
    profilePhoto?: string
    profilePhotoVerified?: boolean;
}

export type submitDocuments = Omit<Partial<IDocuments>, 'nationalIdVerified' | 'maritalStatusVerified' | 'profilePhotoVerified' | 'id'>