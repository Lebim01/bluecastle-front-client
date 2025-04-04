import useAxios from "@/hooks/useAxios";
import axiosInstance from "@/services";
import { Card, Progress, Spinner } from "@heroui/react";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const CountriesList = () => {
    const i18n = useTranslation()
    const [countries, setCountries] = useState<{ name: string, value: number }[]>([])
    const fetchCountries = async () => {
        const countriesRes = await fetch("https://flagcdn.com/en/codes.json");
        const countriesWithCode = await countriesRes.json();

        const countriesResponse = await axiosInstance.get<Record<string, number>>(
            "countries"
        );
        const countriesData = countriesResponse.data;

        const data = Object.entries(countriesData).map(([code, value]) => ({
            name: countriesWithCode[code.toLowerCase()] || code,
            value: value,
        }));
        setCountries(data)
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    const totalUsers = useMemo(() => {
        return countries.reduce((acc, country) => acc + country.value, 0);
    }, [countries]) 

    const sortedCountries =  useMemo(() => {
        return [...countries].sort((a, b) => b.value - a.value);
    }, [countries])

    if (!countries) return (<Spinner />)
    return (
        <Card className="p-4 flex flex-col gap-4">
            <span className="text-xl">{i18n.t('countries')}</span>
            <div className="grid grid-cols-1 w-full gap-x-4 items-center">
                {sortedCountries.slice(0, 10).map((country, index) => {
                    const percent = ((Number(country.value) / totalUsers) * 100)
                    return (
                        <div key={index} className="grid grid-cols-[min-content_1fr_min-content_min-content] w-full gap-1 items-center">
                            <span className="truncate w-20">{country?.name}</span>
                            <div className="w-[200px]">
                                <Progress className="w-full" value={percent} />
                            </div>
                            <span>{country.value}</span>
                            <span className='whitespace-nowrap w-16 truncate'>({percent.toFixed(2)})%</span>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

export default CountriesList