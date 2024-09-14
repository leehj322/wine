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

  const [textError, setTextError] = useState({
    name: false,
    region: false,
    price: false,
  });

  const handleWineValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "name") {
      if (value.length > 40) {
        setTextError((prev) => ({ ...prev, name: true }));
        return;
      }
      setTextError((prev) => ({ ...prev, name: false }));
    }

    if (id === "price") {
      if (Number(value) < 0 || Number(value) > 10000000) {
        setTextError((prev) => ({ ...prev, price: true }));
        return;
      }
      setTextError((prev) => ({ ...prev, price: false }));
    }

    if (id === "region") {
      if (value.length > 40) {
        setTextError((prev) => ({ ...prev, region: true }));
        return;
      }

      setTextError((prev) => ({ ...prev, region: false }));
    }

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
      <article className="flex flex-col gap-8 p-10 max-md:gap-2">
        <span className="text-2xl-24px-bold max-md:text-xl-20px-bold">
          와인 등록
        </span>
        <form
          className="flex flex-col gap-7 max-md:gap-3"
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
              <div className="relative flex flex-col gap-4">
                <Input
                  id="name"
                  placeholder="와인 이름 입력"
                  value={wineValue.name}
                  onChange={handleWineValueChange}
                  isErrored={textError.name}
                />
                {textError.name && (
                  <span className="absolute top-12 pl-2 text-xs-12px-medium text-red-500 max-md:top-10">
                    와인 이름은 최대 40자까지 입력할 수 있습니다.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 max-md:gap-2">
              <label
                htmlFor="price"
                className="text-lg-16px-medium max-md:text-md-14px-medium"
              >
                가격
              </label>
              <div className="relative flex flex-col gap-4">
                <Input
                  id="price"
                  placeholder="가격 입력"
                  type="number"
                  value={wineValue.price === 0 ? "" : wineValue.price}
                  onChange={handleWineValueChange}
                  isErrored={textError.price}
                />
                {textError.price && (
                  <span className="absolute top-12 pl-2 text-xs-12px-medium text-red-500 max-md:top-10">
                    와인 가격은 0원 부터 1000만원까지 입력할 수 있습니다.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 max-md:gap-2">
              <label
                htmlFor="region"
                className="text-lg-16px-medium max-md:text-md-14px-medium"
              >
                원산지
              </label>
              <div className="relative flex flex-col gap-4">
                <Input
                  id="region"
                  placeholder="원산지 입력"
                  value={wineValue.region}
                  onChange={handleWineValueChange}
                  isErrored={textError.region}
                />
                {textError.region && (
                  <span className="absolute top-12 pl-2 text-xs-12px-medium text-red-500 max-md:top-10">
                    와인 원산지는 최대 40자까지 입력할 수 있습니다.
                  </span>
                )}
              </div>
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
