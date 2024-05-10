'use client';
import { createContext, useContext, useState } from 'react';
import type { Todo } from './types';

type InitialStateType = {
	openTodoMenu: boolean,
	openTodoAdd: boolean,
	setOpenTodoAdd: React.Dispatch<boolean>,
	openTodoEdit: boolean,
	setOpenTodoEdit: React.Dispatch<boolean>,
	anchor: HTMLElement|null,
	setAnchor: React.Dispatch<HTMLElement|null>,
	selectedTodo: Todo|null,
	setSelectedTodo: React.Dispatch<Todo|null>,
	handleOpenMenu: (event: React.MouseEvent<HTMLButtonElement>) => void,
	handleCloseMenu: () => void,
};

const initialState = {
	openTodoMenu: false,
	openTodoAdd: false,
	setOpenTodoAdd: () => null,
	openTodoEdit: false,
	setOpenTodoEdit: () => null,
	anchor: null,
	setAnchor: () => null,
	selectedTodo: null,
	setSelectedTodo: () => null,
	handleOpenMenu: () => null,
	handleCloseMenu: () => null,
};

const OpenContext = createContext<InitialStateType>(initialState);

export function OpenProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const [openTodoAdd, setOpenTodoAdd] = useState(false);
	const [openTodoEdit, setOpenTodoEdit] = useState(false);
	const [anchor, setAnchor] = useState<HTMLElement|null>(null);
	const [selectedTodo, setSelectedTodo] = useState<Todo|null>(null);
  const openTodoMenu = Boolean(anchor);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

	return (
		<OpenContext.Provider
			value={{
				openTodoMenu,
				openTodoAdd,
				openTodoEdit,
				setOpenTodoAdd,
				setOpenTodoEdit,
				anchor,
				setAnchor,
				selectedTodo,
				setSelectedTodo,
				handleOpenMenu,
				handleCloseMenu,
			}}
		>
			{children}
		</OpenContext.Provider>
	);
}

export function useOpen() {
	return useContext(OpenContext);
}
