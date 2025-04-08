import useAxios from "@/hooks/useAxios";
import { FormErrors, FormValues } from "@/types/Forms";
import { Button, Card, Form, Input, Spacer, user } from "@heroui/react"
import { User } from "@/types/User";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/services";
import { toast } from "react-hot-toast";

const Step1 = () => {
    const { data: user } = useAxios<User>({ url: "users/me", method: "get" });
    const [loading, setLoading] = useState(false);
    const i18n = useTranslation()
    const [errors, setErrors] = useState<FormErrors>({});
    const [values, setValues] = useState<FormValues>({
        name: "",
        whatsapp: "",
        state: "",
        city: "",
    });
    const [country, setCountry] = useState("")

    useEffect(() => {
        setUser();
        getCountries()
    }, [user]);

    const setUser = () => {
        if (user) {
            setValues({
                name: user.name || "",
                whatsapp: user?.whatsapp || "",
                state: user?.state || "",
                city: user?.city || "",
            });
        }
    };

    const getCountries = async () => {
        if (user) {
            const countriesRes = await fetch("https://flagcdn.com/en/codes.json");
            const countries = await countriesRes.json();
            const countryResponse = user ? Object.entries(countries).find(
                ([code, name]) => code === user.country
            )?.[1] : ""
            if (countryResponse) {
                setCountry(countryResponse as string)
            }
        }
    }



    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!values.name) newErrors.name = i18n.t('errors.name_is_required');

        if (!values.whatsapp)
            newErrors.whatsapp = i18n.t('errors.whatsapp_number_required');
        if (!values.state) newErrors.state = i18n.t('errors.state_required');
        if (!values.city) newErrors.city = i18n.t('errors.city_required');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        if (validate()) {
            try {
                await axiosInstance.post("users/update", {
                    ...values,
                });
                toast.success(i18n.t('errors.profile_updated_successfully'));
                setLoading(false);
            } catch (error) {
                console.error("fallo al actualizar al usuario", error);
                toast.error(i18n.t('errors.profile_update_failed'));
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <span className="text-3xl">Completa la información faltante</span>
            </div>
            <Form onSubmit={handleSubmit}>
                <span>{i18n.t('profile_view.personal_data')}</span>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                    <Input
                        className=""
                        label={i18n.t('profile_view.name')}
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        errorMessage={errors.name}
                        isInvalid={!!errors.name}
                        variant="bordered"
                    />

                    <Input
                        className=""
                        type="email"
                        label={i18n.t('profile_view.email')}
                        name="email"
                        value={user?.email || ""}
                        variant="bordered"
                        disabled
                    />
                </div>
                <Spacer y={1} />
                <span>{i18n.t('profile_view.social_networks')}</span>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                    <Input
                        className=""
                        type="number"
                        label="WhatsApp"
                        name="whatsapp"
                        value={values.whatsapp}
                        onChange={handleChange}
                        errorMessage={errors.whatsapp}
                        isInvalid={!!errors.whatsapp}
                        variant="bordered"
                    />
                </div>
                <Spacer y={1} />
                <span>{i18n.t('profile_view.address')}</span>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                    <Input
                        className=""
                        label={i18n.t('profile_view.country')}
                        readOnly
                        value={country || ""}
                        variant="bordered"
                    />

                    <Input
                        className=""
                        label={i18n.t('profile_view.state')}
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        errorMessage={errors.state}
                        isInvalid={!!errors.state}
                        variant="bordered"
                    />

                    <Input
                        className=""
                        label={i18n.t('profile_view.city')}
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        errorMessage={errors.city}
                        isInvalid={!!errors.city}
                        variant="bordered"
                    />
                </div>
                <Spacer y={1} />
                <div className="flex justify-end w-full">
                    <Button type="submit" color="primary" size="lg">
                        Siguiente
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Step1