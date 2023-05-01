import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState(null);
    const [lastDirection, setLastDirection] = useState();
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const userId = cookies.UserId;

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user", {
                params: { userId },
            });
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getSportsUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/sports-users",
                {
                    params: { sport: user?.about },
                }
            );
            setGenderedUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (user) {
            getSportsUsers();
        }
        // eslint-disable-next-line
    }, [user]);

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put("http://localhost:8000/addmatch", {
                userId,
                matchedUserId,
            });
            getUser();
        } catch (err) {
            console.log(err);
        }
    };

    const swiped = (direction, swipedUserId) => {
        if (direction === "right") {
            updateMatches(swipedUserId);
        }
        setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    };

    const matchedUserIds = user?.matches
        .map(({ user_id }) => user_id)
        .concat(userId);

    const filteredGenderedUsers = genderedUsers?.filter(
        (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
    );

    console.log("filteredGenderedUsers ", filteredGenderedUsers);
    return (
        <>
            {user && (
                <div className="dashboard">
                    <ChatContainer user={user} />
                    <div className="swipe-container">
                        <div className="card-container">
                            {filteredGenderedUsers?.map((genderedUser) => (
                                <TinderCard
                                    className="swipe cursor-pointer"
                                    key={genderedUser.user_id}
                                    onSwipe={(dir) =>
                                        swiped(dir, genderedUser.user_id)
                                    }
                                    onCardLeftScreen={() =>
                                        outOfFrame(genderedUser.first_name)
                                    }
                                >
                                    <div
                                        style={{
                                            backgroundImage:
                                                "url(" + genderedUser.url + ")",
                                        }}
                                        className="card relative overflow-hidden"
                                    >
                                        <div className="absolute w-full bg-black/50 bottom-0 p-2 px-3">
                                            <h3 className="text-3xl text-white text-left">
                                                {genderedUser.first_name}
                                            </h3>
                                            <h3 className="text-xl text-slate-400 text-left">
                                                plays {genderedUser.about}
                                            </h3>
                                        </div>
                                    </div>
                                </TinderCard>
                            ))}
                            <div className="swipe-info">
                                {lastDirection ? (
                                    <p>You swiped {lastDirection}</p>
                                ) : (
                                    <p />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Dashboard;
