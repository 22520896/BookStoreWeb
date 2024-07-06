import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Sach.scss'
import sachService from "../../services/sachService"
import { toast } from 'react-toastify';
class Sach extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DSSach: [],
            type: "",
            keyword: "",
        }
    }
    async componentDidMount() { 
        await this.getDSSach()
    }

    thongBao = (errCode, message) => {
        let prop = {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            closeButton: false,
            className: 'custom-toast', 
            bodyClassName: 'custom-toast-body' 
        }
        if (errCode === 0) {
            toast.success(message, prop)
        }
        else {
            toast.error(message, prop)
        }
    }


    handleOnChange = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        console.log(this.state[id])
    }


    //GỌI API LẤY DANH SÁCH TÀI KHOẢN
    getDSSach = async () => {
        let response = await sachService.getDSSach()
        if (response && response.errCode === 0) {
            this.setState({
                DSSach: response.DSSach
            })
        }
    }

        //----------------------------------------------------------------------------------------------
    //GỌI API TÌM KIẾM TÀI KHOẢN
    searchSach = async (type, keyword) => {
        try {
            if (!type) {
                this.thongBao(-1, "Vui lòng chọn mục tìm kiếm!")
            }
            else {
                if (!keyword) {
                    this.thongBao(-1, "Vui lòng nhập từ khóa tìm kiếm!")
                }
                else {
                    let response = await sachService.searchSach(type, keyword)
                    if (response && response.errCode === 0) {
                        this.setState({
                            DSSach: response.DSSach
                        })
                    }
                    else { this.thongBao(response.errCode, response.message) }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          const inputElements = document.querySelectorAll('.search input, .search select');
          const currentIndex = Array.from(inputElements).indexOf(event.target);
          if (currentIndex < inputElements.length - 1) {
            inputElements[currentIndex + 1].focus();
          } else {
            this.searchSach(this.state.type, this.state.keyword)
          }
        }
      }

      render() {
        let DSSach = this.state.DSSach
        return (
            <div className="sach-container">
                <div className="title text-center">Tra Cứu Sách</div>
                <div class="col-12">
                    <div class="search-container">
                        <div className='mt-1 mx-3'>
                            <button className='btn px-3'
                                onClick={() => this.getDSSach()}>Tất cả sách</button>
                        </div>
                        <div class="form-group search-div">
                            <div class="search">
                                <span>
                                    <select className='form-select type' onChange={(event) => { this.handleOnChange(event, "type") }} onKeyDown={this.handleKeyDown}>
                                        <option value="">Chọn mục</option>
                                        <option value="idSach">Mã Sách</option>
                                        <option value="tenSach">Tên Sách</option>
                                        <option value="theLoai">Thể Loại</option>
                                        <option value="tacGia">Tác Giả</option>
                                        <option value="soLuong">Số Lượng</option>
                                        <option value="donGiaBan">Đơn Giá Bán</option>
                                        
                                    </select>
                                </span>
                                <input type="text" placeholder="Nhập từ khóa tìm kiếm" class="form-control keyword" onChange={(event) => { this.handleOnChange(event, "keyword") }}
                                onKeyDown={this.handleKeyDown} />
                            </div>
                            <div class="search-btn">
                                <button type="submit" class="btn btn-base" onClick={() => { this.searchSach(this.state.type, this.state.keyword) }}> <i class="fas fa-search"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sach-table mt-4 mx-3'>
                    <table class="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã Sách</th>
                                <th>Tên Sách</th>
                                <th>Thể Loại</th>
                                <th>Tác Giả</th>
                                <th>Số Lượng</th>
                                <th>Đơn Giá Bán</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DSSach && DSSach.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.idSach}</td>
                                            <td>{item.tenSach}</td>
                                            <td>{item.theLoai}</td>
                                            <td>{item.tacGia}</td>
                                            <td>{item.soLuong}</td>
                                            <td>{item.donGiaBan}</td>
                                        </tr>
                                    </>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}


const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sach);
