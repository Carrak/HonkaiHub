import { MenuItem } from "@mui/material";

interface DropdownOption {
    label: string;
    value: string | number;
}

export function select(arr: any[]): JSX.Element[] {
    return arr.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)) 
}

export const exalted: DropdownOption[] = [
    {
        label: "Nirvana | Myriad 1-50",
        value: "ex_nirvana_myriad_1-50"
    },
    {
        label: "Nirvana | Myriad 51-100",
        value: "ex_nirvana_myriad_51-100"
    },
    {
        label: "Nirvana",
        value: "ex_nirvana"
    },
    {
        label: "Redlotus",
        value: "ex_redlotus"
    },
    {
        label: "Agony III",
        value: "ex_agony3"
    },
    {
        label: "Agony II",
        value: "ex_agony2"
    },
    {
        label: "Agony I",
        value: "ex_agony1"
    },
    {
        label: "Sinful III",
        value: "ex_sinful3"
    },
    {
        label: "Sinful II",
        value: "ex_sinful2"
    },
    {
        label: "Sinful I",
        value: "ex_sinful1"
    },
    {
        label: "Forbidden",
        value: "ex_forbidden"
    },
];

export const manifold: DropdownOption[] = [
    {
        label: "Redlotus",
        value: "masters_redlotus"
    },
    {
        label: "Redlotus/Agony",
        value: "masters_agony_redlotus"
    },
    {
        label: "Agony/Original Sin",
        value: "masters_agony_osin"
    },
];

export const bp: DropdownOption[] = [
    {
        label: "Vanguard (F2P)",
        value: 0
    },
    {
        label: "Knight/Paladin",
        value: 1
    }
];

export const realm: DropdownOption[] = [
    {
        label: "Abstinence | x2.25",
        value: "abstinence"
    },
    {
        label: "Submergence | x2",
        value: "submergence"
    },
    {
        label: "Inferno | x1.75",
        value: "inferno"
    },
    {
        label: "Shroud | x1.5",
        value: "shroud"
    },
    {
        label: "Void | x1",
        value: "void"
    },
]

export const currencies: DropdownOption[] = [
    {
        label: "Crystals",
        value: 0
    },
    {
        label: "Expansion cards",
        value: 1
    },
    {
        label: "Focused cards",
        value: 2
    },
    {
        label: "ELF cards",
        value: 3
    },
    {
        label: "SP cards",
        value: 4
    },
    {
        label: "Dorm cards",
        value: 5
    },
]