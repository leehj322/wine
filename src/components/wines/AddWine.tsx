import React, { useEffect, useState } from "react";
import postImage from "@/libs/axios/image/postImage";
import { PostWineDetails, WineEnum } from "@/types/wines";
import postWines from "@/libs/axios/wine/postWines";
import Input from "../@shared/Input";
import Button from "../@shared/Button";
import InputSelect from "../@shared/InputSelect";
import Dropdown from "../@shared/DropDown";
import FileInput from "../@shared/FileInput";

interface Props {
  onClose: () => void;
  onAddWine: () => void;
}

export default function AddWine({ onClose, onAddWine }: Props) {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [wineValue, setWineValue] = useState<PostWineDetails>({
    name: "",
    region: "",
    image: "",
    price: 0,
    type: WineEnum.Red,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const wineTypes = [
    { id: 1, value: WineEnum.Red },
    { id: 2, value: WineEnum.White },
    { id: 3, value: WineEnum.Sparkling },
  ];

  const handleWineValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setWineValue((prevWineValue) => ({
      ...prevWineValue,
      [id]: id === "price" ? Number(value) : value,
    }));
  };

  const handleWineTypeChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: WineEnum,
  ) => {
    e.preventDefault();
    setWineValue((prevWineValue) => ({
      ...prevWineValue,
      type,
    }));
  };

  const handleChangeImage = (image: File | null) => {
    if (image) {
      setImageFile(image);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!imageFile) {
        throw new Error("이미지 파일이 등록되지 않았습니다");
      }
      const imageUrl = await postImage(imageFile);
      const postWineValue = { ...wineValue, image: imageUrl };
      const result = await postWines(postWineValue);

      if (!result) {
        throw new Error("와인 정보가 정상적으로 등록되지 않았습니다");
      }

      onAddWine();
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  const handelCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    const { name, price, region } = wineValue;
    if (name !== "" && price !== 0 && region !== "" && imageFile !== null) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [wineValue, imageFile]);

  return (
    <div className="z-50 h-[871px] w-[460px] rounded-3xl bg-light-white max-md:h-full max-md:w-[350px]">
      <article className="flex flex-col gap-10 p-6 max-md:gap-2">
        <span className="text-2xl-24px-bold max-md:text-xl-20px-bold">
          와인 등록
        </span>
        <form
          className="flex flex-col gap-10 max-md:gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6 max-md:gap-3">
            <div className="flex flex-col gap-4 max-md:gap-2">
              <label
                htmlFor="name"
                className="text-lg-16px-medium max-md:text-md-14px-medium"
              >
                와인 이름
              </label>
              <Input
                id="name"
                placeholder="와인 이름 입력"
                onChange={handleWineValueChange}
              />
            </div>

            <div className="flex flex-col gap-4 max-md:gap-2">
              <label
                htmlFor="price"
                className="text-lg-16px-medium max-md:text-md-14px-medium"
              >
                가격
              </label>
              <Input
                id="price"
                placeholder="가격 입력"
                type="number"
                onChange={handleWineValueChange}
              />
            </div>

            <div className="flex flex-col gap-4 max-md:gap-2">
              <label
                htmlFor="region"
                className="text-lg-16px-medium max-md:text-md-14px-medium"
              >
                원산지
              </label>
              <Input
                id="region"
                placeholder="원산지 입력"
                onChange={handleWineValueChange}
              />
            </div>

            <div className="flex flex-col gap-4 max-md:gap-2">
              <label
                htmlFor="type"
                className="text-lg-16px-medium max-md:text-md-14px-medium"
              >
                타입
              </label>

              <Dropdown
                width="w-full mx-auto"
                buttonChildren={<InputSelect placeholder={wineValue.type} />}
                childType="wine"
              >
                {wineTypes.map((wineType) => (
                  <button
                    key={wineType.id}
                    value={wineType.value}
                    onClick={(e) => handleWineTypeChange(e, wineType.value)}
                  >
                    {wineType.value}
                  </button>
                ))}
              </Dropdown>
            </div>

            <div className="flex flex-col gap-4 max-md:gap-2">
              <label htmlFor="image" className="text-lg-16px-medium">
                이미지
              </label>
              <FileInput
                id="image"
                onChangeImage={handleChangeImage}
                hasPreview
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="h-[54px] w-1/3">
              <Button buttonStyle="light" onClick={handelCancelClick}>
                취소
              </Button>
            </div>
            <div className="h-[54px] w-2/3">
              <Button
                buttonStyle={submitDisabled ? "gray" : "purple"}
                type="submit"
                disabled={submitDisabled}
              >
                와인 등록하기
              </Button>
            </div>
          </div>
        </form>
      </article>
    </div>
  );
}
