import {axiosNodeInstance, handleNodeResponse} from "@/lib/axiosInstance";

const ENDPOINT = {
    getMakersByFuelOrBodyType: "/search/fuelTypesandbodyTypesmakers",
};

export  const getMakersByFuelOrBodyType  = async (data) => {
    try {
      const  {fuelType , bodyType , page , limit } = data

      const res = await  axiosNodeInstance.get(ENDPOINT.getMakersByFuelOrBodyType , {
        params: { fuelType, bodyType , page , limit },
      });
      return handleNodeResponse(res) ;

    }catch (error) {
            throw error;
    }
}