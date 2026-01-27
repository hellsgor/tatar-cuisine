'use client';

import { IngredientsFormData } from '@/types/ingredients-form-data';
import { useState } from 'react';
import CustomForm from '@/components/common/form';
import { Input } from '@heroui/input';
import { FORM_ERRORS } from '@/config/forms.config';
import { Select, SelectItem } from '@heroui/react';
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/config/select-options';

export default function IngredientsForm() {
  const [formData, setFormData] = useState<IngredientsFormData>({
    name: '',
    category: '',
    description: '',
    pricePerUnit: null,
    unit: '',
  });

  return (
    <CustomForm<IngredientsFormData>
      formData={formData}
      className="w-[400px]"
      actionButtonText="Добавить ингредиент"
      onSubmitCallback={async () => {
        console.log('Form Submitted:', formData);
      }}
    >
      <Input
        isRequired
        aria-label="Имя ингредиента"
        name="name"
        placeholder="Введите название ингредиента"
        type="text"
        value={formData.name}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        validate={(value) => {
          if (!value) return FORM_ERRORS.required;
          return null;
        }}
      />

      <div className="flex gap-2 w-full justify-between">
        <div className="w-1/3">
          <Select
            isRequired
            aria-label="Категория ингредиента"
            name="category"
            placeholder="Выберите категорию"
            selectedKeys={formData.category ? [formData.category] : []}
            classNames={{
              trigger: 'bg-default-100 w-full',
              innerWrapper: 'text-sm',
              value: 'truncate',
              selectorIcon: 'text-black',
            }}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-1/3">
          <Select
            isRequired
            name="pricePerUnit"
            aria-label="Единицы измерения ингредиента"
            placeholder="Ед. изм."
            selectedKeys={formData.unit ? [formData.unit] : []}
            classNames={{
              trigger: 'bg-default-100 w-full',
              innerWrapper: 'text-sm',
              value: 'truncate',
              selectorIcon: 'text-black',
            }}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-1/3">
          <Input
            isRequired
            aria-label="Цена за единицу ингредиента"
            name="pricePerUnit"
            placeholder="Цена"
            type="number"
            value={
              formData.pricePerUnit !== null
                ? formData.pricePerUnit.toString()
                : ''
            }
            classNames={{
              inputWrapper: 'bg-default-100',
              input: 'text-sm focus:outline-none',
            }}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : null;
              setFormData({ ...formData, pricePerUnit: value });
            }}
            endContent={
              <span className="absolute right-3 top-1/2 transform -translate-y-[50%] text-black">
                ₽
              </span>
            }
            validate={(value) => {
              if (!value) return FORM_ERRORS.required;
              const num = parseFloat(value);
              if (isNaN(num) || num < 0) return FORM_ERRORS.incorrectValue;
              return null;
            }}
          />
        </div>
      </div>

      <Input
        name="description"
        aria-label="Описание ингредиента"
        placeholder="Введите описание"
        type="text"
        value={formData.description}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
    </CustomForm>
  );
}
