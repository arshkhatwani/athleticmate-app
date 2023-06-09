import Nav from "../components/Nav";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sports from "../constants/sports";

const OnBoarding = () => {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        gender_identity: "man",
        url: "",
        about: sports[0],
        matches: [],
    });

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log("submitted");
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:8000/user", {
                formData,
            });
            console.log(response);
            const success = response.status === 200;
            if (success) navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        console.log("e", e);
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <Nav minimal={true} setShowModal={() => {}} showModal={false} />

            <div className="onboarding">
                <h2 className="my-6 text-2xl">CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit} className="gap-5">
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            className="p-2"
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                className="p-2"
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                className="p-2"
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                className="p-2"
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                className="p-2"
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === "man"}
                            />
                            <label htmlFor="man-gender-identity">Man</label>
                            <input
                                className="p-2"
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === "woman"}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>
                            <input
                                className="p-2"
                                id="more-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_identity === "more"}
                            />
                            <label htmlFor="more-gender-identity">More</label>
                        </div>

                        <label htmlFor="about">I like to play</label>
                        <select
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            value={formData.about}
                            onChange={handleChange}
                        >
                            {sports.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <input className="p-2" type="submit" />
                    </section>

                    <section>
                        <label htmlFor="url">Profile Photo</label>
                        <input
                            className="p-2"
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && (
                                <img
                                    src={formData.url}
                                    alt="profile pic preview"
                                />
                            )}
                        </div>
                    </section>
                </form>
            </div>
        </>
    );
};
export default OnBoarding;
