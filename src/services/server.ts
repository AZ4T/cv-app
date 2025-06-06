import { createServer, Model, Server } from 'miragejs';

export default function makeServer({
	environment = 'development',
} = {}): Server {
	return createServer({
		environment,

		models: {
			education: Model,
			skill: Model,
		},

		seeds(server) {
			server.db.loadData({
				educations: [
					{
						id: 1,
						date: 'September 2015 - June 2019',
						title: 'B.Sc. in Computer Science',
						description:
							'University of Example: Major in Software Engineering',
					},
					{
						id: 2,
						date: 'September 2019 - June 2021',
						title: 'M.Sc. in Computer Science',
						description:
							'Institute of Mock Data: Thesis on Frontend Architectures',
					},
				],
				skills: [
					{ id: 1, name: 'JavaScript', range: 80 },
					{ id: 2, name: 'React', range: 75 },
					{ id: 3, name: 'CSS', range: 70 },
				],
			});
		},

		routes() {
			this.urlPrefix = 'http://localhost:5173';
			this.namespace = 'api';

			this.get(
				'/educations',
				() => {
					return {
						data: [
							{
								date: 2001,
								title: 'Title 0',
								text: 'Elit voluptate ad nostrud laboris. Elit incididunt mollit enim enim id id laboris dolore et et mollit. Mollit adipisicing ullamco exercitation ullamco proident aute enim nisi. Dolore eu fugiat consectetur nulla sunt Lorem ex ad. Anim eiusmod do tempor fugiat minim do aliqua amet ex dolore velit.\r\n',
							},
							{
								date: 2000,
								title: 'Title 1',
								text: 'Et irure culpa ad proident labore excepteur elit dolore. Quis commodo elit culpa eiusmod dolor proident non commodo excepteur aute duis duis eu fugiat. Eu duis occaecat nulla eiusmod non esse cillum est aute elit amet cillum commodo.\r\n',
							},
							{
								date: 2012,
								title: 'Title 2',
								text: 'Labore esse tempor nisi non mollit enim elit ullamco veniam elit duis nostrud. Enim pariatur ullamco dolor eu sunt ad velit aute eiusmod aliquip voluptate. Velit magna labore eiusmod eiusmod labore amet eiusmod. In duis eiusmod commodo duis. Exercitation Lorem sint do aliquip veniam duis elit quis culpa irure quis nulla. Reprehenderit fugiat amet sint commodo ex.\r\n',
							},
							{
								date: 2001,
								title: 'Title 0',
								text: 'Elit voluptate ad nostrud laboris. Elit incididunt mollit enim enim id id laboris dolore et et mollit. Mollit adipisicing ullamco exercitation ullamco proident aute enim nisi. Dolore eu fugiat consectetur nulla sunt Lorem ex ad. Anim eiusmod do tempor fugiat minim do aliqua amet ex dolore velit.\r\n',
							},
							{
								date: 2000,
								title: 'Title 1',
								text: 'Et irure culpa ad proident labore excepteur elit dolore. Quis commodo elit culpa eiusmod dolor proident non commodo excepteur aute duis duis eu fugiat. Eu duis occaecat nulla eiusmod non esse cillum est aute elit amet cillum commodo.\r\n',
							},
							{
								date: 2012,
								title: 'Title 2',
								text: 'Labore esse tempor nisi non mollit enim elit ullamco veniam elit duis nostrud. Enim pariatur ullamco dolor eu sunt ad velit aute eiusmod aliquip voluptate. Velit magna labore eiusmod eiusmod labore amet eiusmod. In duis eiusmod commodo duis. Exercitation Lorem sint do aliquip veniam duis elit quis culpa irure quis nulla. Reprehenderit fugiat amet sint commodo ex.\r\n',
							},
							{
								date: 2001,
								title: 'Title 0',
								text: 'Elit voluptate ad nostrud laboris. Elit incididunt mollit enim enim id id laboris dolore et et mollit. Mollit adipisicing ullamco exercitation ullamco proident aute enim nisi. Dolore eu fugiat consectetur nulla sunt Lorem ex ad. Anim eiusmod do tempor fugiat minim do aliqua amet ex dolore velit.\r\n',
							},
							{
								date: 2000,
								title: 'Title 1',
								text: 'Et irure culpa ad proident labore excepteur elit dolore. Quis commodo elit culpa eiusmod dolor proident non commodo excepteur aute duis duis eu fugiat. Eu duis occaecat nulla eiusmod non esse cillum est aute elit amet cillum commodo.\r\n',
							},
							{
								date: 2012,
								title: 'Title 2',
								text: 'Labore esse tempor nisi non mollit enim elit ullamco veniam elit duis nostrud. Enim pariatur ullamco dolor eu sunt ad velit aute eiusmod aliquip voluptate. Velit magna labore eiusmod eiusmod labore amet eiusmod. In duis eiusmod commodo duis. Exercitation Lorem sint do aliquip veniam duis elit quis culpa irure quis nulla. Reprehenderit fugiat amet sint commodo ex.\r\n',
							},
						],
					};
				},
				{ timing: 3000 }
			);

			this.get('/skills', (schema) => {
				return schema.db.skills;
			}, { timing: 3000 });

			this.timing = 0;

			this.post('/skills', (schema, request) => {
				const attrs = JSON.parse(request.requestBody);
				return schema.db.skills.insert(attrs);
			}, { timing: 3000 });
		},
	});
}
