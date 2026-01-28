'use client';

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/config/select-options';
import { useAuthStore } from '@/store/auth.store';
import { useIngredientStore } from '@/store/ingredient.store';
import { Ingredient } from '@/types/ingredient';
import { resolveOptionLabel } from '@/helpers/resolveOptionValue';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

export default function IngredientsTable() {
  const { ingredients, removeIngredient, isLoading } = useIngredientStore();
  const { isAuth } = useAuthStore();

  const handleDelete = async (id: Ingredient['id']) => {
    await removeIngredient(id);
  };

  return !isLoading ? (
    <Table
      aria-label="Список ингредиентов"
      classNames={{
        table: 'w-full',
        th: 'text-black',
        td: 'text-black',
      }}
    >
      <TableHeader>
        <TableColumn>Название</TableColumn>
        <TableColumn>Категория</TableColumn>
        <TableColumn>Ед. изм.</TableColumn>
        <TableColumn>Цена за единицу</TableColumn>
        <TableColumn>Описание</TableColumn>
        <TableColumn>Действия</TableColumn>
      </TableHeader>
      <TableBody>
        {ingredients.map((ing) => (
          <TableRow key={ing.id}>
            <TableCell>{ing.name}</TableCell>
            <TableCell>
              {resolveOptionLabel(ing.category, CATEGORY_OPTIONS)}
            </TableCell>
            <TableCell>{resolveOptionLabel(ing.unit, UNIT_OPTIONS)}</TableCell>
            <TableCell>
              {ing.pricePerUnit !== null ? `${ing.pricePerUnit} ₽` : '-'}{' '}
            </TableCell>
            <TableCell>
              {ing.description?.length ? ing.description : '–'}
            </TableCell>
            <TableCell>
              <Button
                color="danger"
                size="sm"
                onPress={() => handleDelete(ing.id)}
                disabled={!isAuth}
              >
                Удалить
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <p className="mt-4">Загрузка...</p>
  );
}
