import { Button, Card, Nav } from "react-bootstrap"
import { formatCurrency } from "../utils/formatCurrency"
import { NavLink, useNavigate } from 'react-router-dom'
import ServiceList from "../pages/provider/ServiceList"


type ServiceLayoutProps = {
    id: number
    name: string
    price: number
    area: string
    category: string
    imgUrl: string
  }


  




   export function ServiceLayout({ id, name, price, area, category, imgUrl }: ServiceLayoutProps) {

    const navigate = useNavigate()
    function jump(myId: number) {
        navigate("ServiceDetail", {
            state: {id: myId}
        })
        alert(`I am here: ${id}!`);
      }

    // const sayHello = (name: string) => {
    //     alert(`Hello, ${name}!`);
    //   };

    // const {
    //     getItemQuantity,
    //     increaseCartQuantity,
    //     decreaseCartQuantity,
    //     removeFromCart,
    //   } = useShoppingCart()
    // const quantity = getItemQuantity(id)
        // return <Card  >
        //     <Card.Img
        //         variant="top"
        //         src={imgUrl}
        //         height="200px"
        //         style={{ objectFit: "cover" }} 
        //      />
        //     <Card.Body className="d-flex flex-column">
        //         <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
        //             <span className="fs-2">{name}</span>
        //             <span className="ms-2 text-muted">￡{price}</span>
        //         </Card.Title>
        //         <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
        //             <span className="fs-24">{area}</span>
        //         </Card.Title>
        //         <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
        //             <span className="fs-24">{category}</span>
        //         </Card.Title>
        //     </Card.Body>

        // </Card>
        return <div onClick={() => {
            jump(id)
            }}>
            <Card  >
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{ objectFit: "cover" }} 
             />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">￡{price}</span>
                </Card.Title>
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-24">{area}</span>
                </Card.Title>
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-24">{category}</span>
                </Card.Title>
            </Card.Body>

        </Card>
        </div>
   }

