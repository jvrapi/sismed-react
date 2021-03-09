import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Schedule } from '../../../@types/schedule';
import { Message } from '../../../assets/functions';
import { Calendar, SchedulingDetailsModal } from '../../../components';
import { userLogged } from '../../../redux/User/User.selects';

import ScheduleService from '../../../services/schedule';

import { Container } from './styles';

const initialState = {
	id: 0,
	date: '',
	time: '',
	medic: '',
	paid: 0,
	firstTime: 0,
	finished: 0,
	rescheduled: 0,
	attended: 0,
	patient: {
		id: 0,
		name: '',
		age: '',
		cellPhone: '',
	},
	healthInsurance: '',
	editable: false,
	notes: '',
};

const List = () => {
	const { id, perfil } = useSelector(userLogged);
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [showModal, setShowModal] = useState(false);

	const [selectedScheduling, setSelectedScheduling] = useState(initialState);

	const getData = async () => {
		try {
			const response = await ScheduleService.getSchedule(id);
			setSchedules(response.data);
		} catch {
			Message('Não foi possivel carregar os agendamentos', 1);
		}
	};

	const getScheduling = (id: number) => {
		const scheduling = schedules.filter(scheduling => scheduling.id === id);
		if (scheduling[0].finished !== 1) {
			setShowModal(true);
			setSelectedScheduling(scheduling[0]);
		}
	};

	useEffect(() => {
		if (perfil !== 3) {
			getData();
		}
	}, []);

	// useEffect(() => {
	// 	if (initialRender.current) {
	// 		initialRender.current = false;
	// 	} else {
	// 		if (selectedScheduling.finished !== 1) {

	// 		}
	// 	}
	// }, [selectedScheduling]);

	return (
		<>
			<SchedulingDetailsModal showModal={showModal} handleClose={() => setShowModal(false)} scheduling={selectedScheduling as Schedule} />
			<Container>
				<Calendar
					schedules={schedules}
					onClickEvent={id => {
						getScheduling(id);
					}}
				/>
			</Container>
		</>
	);
};

export default List;
