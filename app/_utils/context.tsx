'use client';
import { createContext, useContext, useState } from 'react';
import type { Todo } from './types';

type InitialStateType = {
	openTodoAdd: boolean,
	setOpenTodoAdd: React.Dispatch<boolean>,
	openTodoEdit: boolean,
	setOpenTodoEdit: React.Dispatch<boolean>,
	selectedTodo: Todo|null,
	setSelectedTodo: React.Dispatch<Todo|null>,
	openProfileUpdate: boolean,
	setOpenProfileUpdate: React.Dispatch<boolean>,
	openProfileColor: boolean,
	setOpenProfileColor: React.Dispatch<boolean>,
	openProfileSettings: boolean,
	setOpenProfileSettings: React.Dispatch<boolean>,
	anchor: HTMLElement|null,
	setAnchor: React.Dispatch<HTMLElement|null>,
	openTodoMenu: boolean,
	handleOpenMenu: (event: React.MouseEvent<HTMLButtonElement>) => void,
	handleCloseMenu: () => void,
};

const initialState = {
	openTodoAdd: false,
	setOpenTodoAdd: () => null,
	openTodoEdit: false,
	setOpenTodoEdit: () => null,
	selectedTodo: null,
	setSelectedTodo: () => null,
	openProfileUpdate: false,
	setOpenProfileUpdate: () => null,
	openProfileColor: false,
	setOpenProfileColor: () => null,
	openProfileSettings: false,
	setOpenProfileSettings: () => null,
	anchor: null,
	setAnchor: () => null,
	openTodoMenu: false,
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
	const [selectedTodo, setSelectedTodo] = useState<Todo|null>(null);
	const [openProfileUpdate, setOpenProfileUpdate] = useState(false);
	const [openProfileColor, setOpenProfileColor] = useState(false);
	const [openProfileSettings, setOpenProfileSettings] = useState(false);
	const [anchor, setAnchor] = useState<HTMLElement|null>(null);
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
				openTodoAdd,
				openTodoEdit,
				setOpenTodoAdd,
				setOpenTodoEdit,
				selectedTodo,
				setSelectedTodo,
				openProfileUpdate,
				setOpenProfileUpdate,
				openProfileColor,
				setOpenProfileColor,
				openProfileSettings,
				setOpenProfileSettings,
				anchor,
				setAnchor,
				openTodoMenu,
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
