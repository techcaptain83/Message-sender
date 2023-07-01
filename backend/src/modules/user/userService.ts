import User from "./userModel"
import { generateApiKey, generatePromoCode } from "../../utils";

export const findUser = async (email: string) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (err) {
        console.error(`Error finding user: ${err}`);
        throw err;
    }
}

export const findUserById = async (id: string) => {
    try {
        const user = User.findById(id);
        return user;
    } catch (error) {
        console.error(`Error finding user: ${error}`);
        throw error;
    }
}

export const createUser = async (name: string, email: string, password: string) => {
    try {
        let promoCode = generatePromoCode();
        let apiKey = generateApiKey();

        while (await promoCodeExists(promoCode)) {
            promoCode = generatePromoCode();
        }

        while (await apiKeyExists(apiKey)) {
            apiKey = generateApiKey();
        }

        const user = await User.create({
            name,
            email,
            password,
            promoCode: promoCode,
            apiKey: apiKey
        });
        return user;
    } catch (err) {
        console.error(`Error creating user: ${err}`);
        throw err;
    }
}

export const promoCodeExists = async (promoCode: string): Promise<Boolean> => {
    try {
        const accountWithPromoCode = await User.find({
            promoCode: promoCode
        });
        if (accountWithPromoCode.length > 0) {
            return Boolean(true);
        }
        return Boolean(false);
    } catch (error) {
        console.log(error);
        throw new Error("Internal server error");
    }
}

export const apiKeyExists = async (apiKey: string): Promise<Boolean> => {
    try {
        const accountWithApiKey = await User.find({
            apiKey: apiKey
        });
        if (accountWithApiKey.length > 0) {
            return Boolean(true);
        }
        return Boolean(false);
    } catch (error) {
        console.log(error);
        throw new Error("Internal server error");
    }
}

export const findUserByPromoCode = async (promoCode: string) => {
    try {
        const user = await User.findOne({ promoCode: promoCode });

        return user;

    } catch (error) {
        console.log(error);
        throw new Error("Internal server error");
    }
}