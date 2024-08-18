import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick.js";
import PropTypes from 'prop-types';
import clsx from "clsx";

// Asynchronous function to get menu items
async function getRestaurants(cuisine) {    
    try {
        console.log("[getRestaurants] cuisine: " + cuisine);
        
        let url, response;
        if (cuisine === null) {
            url = `http://localhost:8080/restaurants`;
            response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        } else {
            url = `http://localhost:8080/restaurants?cuisine=${cuisine}`;
            response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

export function RestaurantCard( { className } ) {
    const [count, setCount] = useState(0);
    const [restaurantList, setRestaurantList] = useState([]);
    const [cuisineType, setCuisineType] = useState(null);

    // Aceternity Expandable Card references
    const [active, setActive] = useState(null);
    const ref = useRef(null);
    const id = useId();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('cuisine');
        console.log("name: " + name);
        
        setCuisineType(name);
    }, []);

    useEffect(() => {
        console.log("cuisineType: " + cuisineType);
        if (cuisineType) {
            getRestaurants(cuisineType).then(data => setRestaurantList(data || []));
        }
    }, [cuisineType]);

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={clsx("fixed inset-0 bg-black/20 h-full w-full z-10", className)}
                        />

                        {/* Popup */}
                        <div className="fixed inset-0 grid place-items-center z-[100] bg-slate-800 bg-opacity-75">
                            <motion.div
                                layoutId={`card-${active.itemName}-${id}`}
                                ref={ref}
                                className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                            >
                                {/* <motion.div layoutId={`image-${active.itemName}-${id}`}>
                                    <img src={active.src} width="250" height="260" />
                                </motion.div> */}

                                {/* const veganBistro = await restaurantInfo.insertOne({
                                    restaurantName: "Vegan Bistro",
                                    address: "123 Vegan Street, Plant City",
                                    cuisine: "South Indian",
                                    rating: 4.5,
                                }); */}

                                <div>
                                    <div className="flex justify-between items-start p-4">
                                        <motion.h3
                                            layoutId={`title-${active.restaurantName}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200"
                                        >
                                            {active.restaurantName}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.rating}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400"
                                        >
                                            {active.rating}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layoutId={`button-${active.itemName}-${id}`}
                                        target="_blank"
                                        className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                                    >
                                        <button onClick={() => setCount((count) => count + 1)}>
                                            Order {count}
                                        </button>
                                    </motion.a>
                                </div>

                                <div className="pt-4 relative px-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                                    >
                                        {active.address}
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Cards */}
            <ul className="max-w-2xl mx-auto w-full gap-4">
                {restaurantList?.map((card) => (
                    <motion.div
                        key={card.restaurantName}
                        layoutId={`card-${card.title}-${id}`}
                        onClick={() => setActive(card)}
                        className="p-4 flex flex-col md:flex-row justify-between items-center bg-blue-200 hover:bg-green-100 dark:hover:bg-green-300 rounded-xl cursor-pointer border-2 border-solid border-red-500"
                    >
                        <motion.div layoutId={`image-${card.title}-${id}`}>
                            {/* <div className="w-full h-40 lg:h-40 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top">
                                <img src={card.src} width="100" height="100" />
                            </div> */}
                        </motion.div>
                        <div className="">
                            <motion.h3
                                layoutId={`title-${card.restaurantName}-${id}`}
                                className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                            >
                                {card.restaurantName}
                            </motion.h3>
                            <motion.p
                                layoutId={`description-${card.address}-${id}`}
                                className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                            >
                                {card.address}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}

export default RestaurantCard;

RestaurantCard.propTypes = {
    className: PropTypes.string,
    cardsList: PropTypes.array,
};
