export interface RecipientAge {
    id: any,
    customid: any,
    firstname: string,
    middlename: string,
    lastname: string,
    category: string,
    contactnum: string,
    email: string,
    address: string,
    age: string,
    gender: string
}

//Overview
export interface VaccinatedPerDay {
    vaccinatedPerDay: number,
    day: string
}
export interface VaccinatedSeconddose {
    vaccinatedSeconddose: number,
    day: string
}
//FirstDose Count
export interface FirstDoseCount {
    firstdoseCount: number
}
//SecondDose Count
export interface SecondDoseCount {
    seconddoseCount: number
}
//Available Vaccine Count
export interface AvailableVaccine {
    vaccineCount: number
}
//Efficacy Rate Per Vaccine
export interface EfficacyRate {
    id: any,
    vaccineName: string,
    efficacyRate: number
}


//All Vacinated with no age
export interface Recipient {
    id: any,
    customid:any,
    firstname: string,
    middlename: string,
    lastname: string,
    category: string,
    contactnum: string,
    email: string,
    address: string,
    birthday: string,
    gender: string
}
//Vaccine Brand
export interface Vaccine {
    id: any,
    vaccineName: string,
    stock: number,
    manufacturer: string,
    efficacyRate: number
}

//First Dose Interface
export interface FirstDose {
    fdID: any,
    vrID: number,
    customid: string,
    firstname: string,
    lastname: string,
    category: string,
    gender: string,
    vID: number,
    vaccineName: string,
    vaID: number,
    healthFacility: string,
    date: any
}

//Second Dose Interface
export interface SecondDose {
    sdID: any,
    vrID: number,
    customid: string,
    firstname: string,
    lastname: string,
    category: string,
    gender: string,
    vID: number,
    vaccineName: string,
    vaID: number,
    healthFacility: string,
    date: any
}

//Vaccine Adminitrator
export interface VaccineAdmin {
    id: any,
    healthFacility: string,
    vaccinator: string,
    address: string
}

//Reservation
export interface Reservation {
    id: any,
    firstname: string,
    lastname: string,
    email: string,
    status: string
}

//Message
export interface Message {
    message: string,
    status: string
}

//Combo Box
export interface RecipientID {
    id: number,
    customid: string
}
export interface VaccineID {
    id: number,
    vaccineName: string
}
export interface VaccineAdminID {
    id: number,
    healthFacility: string
}


//Category
export interface Category {
    category: string
}
//Gender
export interface Gender {
    gender: string;
}
//Age
export interface Age {
    age: any;
}


//Statistics Interface
export interface philippineStatistics {
    country: string,
    countryInfo: any,
    iso3: string,
    flag: any,
    cases: number,
    todayCases: number,
    deaths: number,
    todayDeaths: number,
    recovered: number,
    todayRecovered: number,
    active: number,
    critical: number,
    casesPerOneMillion: number,
    deathsPerOneMillion: number,
    tests: number,
    testsPerOneMillion: number,
    population: number,
    continent: string,
    oneCasePerPeople: number,
    oneDeathPerPeople: number,
    oneTestPerPeople: number,
    activePerOneMillion: number,
    recoveredPerOneMillion: number,
    criticalPerOneMillion: number
}

//Vaccinated 
export interface philippineVaccinated {
    country : string,
    timeline: any,
    date: any
}
